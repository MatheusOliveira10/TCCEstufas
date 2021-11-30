//sudo chmod a+rw /dev/ttyUSB0
#include <UIPEthernet.h>
#include <SPI.h>
#include <Ethernet.h>
#include <EthernetClient.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <HttpClient.h>
#include <ArduinoJson.h>
int sensores[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
int portas[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
int leituras[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
char tipoSensor[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
uint8_t mac[6] = {0x00, 0x01, 0x03, 0x04, 0x05, 0x06};

EthernetClient ethClient;
PubSubClient mqttClient;
DHT dht(A1, DHT11);
char serverMosquitto[20] = "broker.hivemq.com";
int portaMosquitto = 1883;
unsigned long ultimoEnvio;
int numElementos, i;

char endpoint[20] = "/sensores?id=2";
char body[500];

void setup() {
  int err = 0;
  Serial.begin(9600);
  
  Serial.println(F("--------- INICIANDO O ARDUINO! ---------"));
  
  // Inicializa Ethernet
  while (Ethernet.begin(mac)== 0) {
    Serial.println("O Ethernet não conectou!");
    //inicializa o mod. ethernet
    delay(1000);
  } 
  
  Serial.print("IP recebido: ");
  Serial.println(Ethernet.localIP());

  EthernetClient c;
  HttpClient http(c);
  
  err = http.get("tccmatheusebruno.ddns.net", endpoint);
  if (err == 0)
  {
    err = http.responseStatusCode();
    
    if (err >= 0)
    {
      Serial.println(err);

      err = http.skipResponseHeaders();
      if (err >= 0)
      {
        int bodyLen = http.contentLength();
        int bodyLenAux = http.contentLength();
      
        unsigned long timeoutStart = millis();
        char c;
        while ( (http.connected() || http.available()) &&
               ((millis() - timeoutStart) < 1000) )
        {
            if (http.available())
            {
                c = http.read();

                body[bodyLenAux - bodyLen] = c;
               
                bodyLen--;
                
                timeoutStart = millis();
            }
            else
            {
                delay(1000);
            }
        }
      }
      else
      {
        Serial.print("Falha ao pular headers: ");
        Serial.println(err);
      }
    }
    else
    {    
      Serial.print("Falha ao pegar a resposta: ");
      Serial.println(err);
    }
  }
  else
  {
    Serial.print("Falha na conexão: ");
    Serial.println(err);
  }
  http.stop();

  // Alocar um documento JSON 
  const size_t capacity = 500;
  StaticJsonDocument<capacity> doc;

  // Parse JSON object
  DeserializationError error = deserializeJson(doc, body);
 
  if (error) {
    Serial.print(F("deserializeJson() falhou: "));
    Serial.println(error.f_str());
    ethClient.stop();
    return;
  }

  JsonArray arr = doc.as<JsonArray>();

  i = 0;
  for (JsonVariant value : arr) {
      sensores[i] = value["id"].as<int>();
      portas[i] = value["porta"].as<int>();
      tipoSensor[i] = value["tipoSensor"].as<char>();
      
      i++;
  }

  numElementos = arr.size();
  
  //conecta ao ip externo
  delay(1000);
  ultimoEnvio = millis();
  dht.begin();
  mqttClient.setClient(ethClient);
  mqttClient.setServer("broker.hivemq.com", 1883);

}

void loop() {  
  int i, j;
  int leitura = 0;
  int enviou = 0;
  int enviando = 0;
  
  //loop através dos sensores
  //para leitura e envio dos dados da estufa
  for(i = 0; i < numElementos; i++) {
    Serial.print("Sensor: ");
    Serial.println(sensores[i]);
    
    switch(tipoSensor[i]) {
      case 'L':
        //LDR
        leitura += 1024 - analogRead(portas[i]);
        Serial.print("LDR: ");
        Serial.println(leitura);
        break;
      case 'T':
        //Temperatura do ar DHT
        leitura += (int) dht.readTemperature();
        Serial.print("Temp. DHT: ");
        Serial.println(dht.readTemperature());
        break;
      case 'U':
        //Umidade do ar DHT
        leitura += (int) dht.readHumidity();
        Serial.print("Um. DHT: ");
        Serial.println(dht.readHumidity());
        break;
      case 'H':
        Serial.print("Higrometro: ");
        leitura += 1024 - analogRead(portas[i]);
        Serial.println(leitura);
        break;
    }
    leituras[i] = leitura;
    
    //se já se passaram 3 minutos (180000 ms) desde o ultimo envio, envia uma mensagem novamente
    //verifica tambm se  o primeiro laço, para evitar inconsistência
    if(millis() - ultimoEnvio > 180000 && (i == 0 || enviando == 1)) { 
    //if(true) {
      enviando = 1;
      
      //itoa(leitura, leituraStr, 10);
      String topicStr = String("mobg/");
      topicStr += sensores[i];
      //Serial.print("Topico: ");
      //Serial.println(topicStr);
        
      char topic[30];
      char leituraStr[30];
      topicStr.toCharArray(topic, 30);
      //Serial.println(topic);
      String(leitura).toCharArray(leituraStr, 30);
      Serial.print("Topico: ");
      Serial.println(topic);
      Serial.print("Mensagem: ");
      Serial.println(leituraStr);
      
      if (!mqttClient.connected()) {
        while (!mqttClient.connected()) {
          //Serial.print("Attempting MQTT connection...");
          // Attempt to connect
          if (mqttClient.connect("mobg")) {
            //Serial.println("connected");
            // Once connected, publish an announcement...
            //Serial.println("Publicando 1: ");
            mqttClient.publish(topic, leituraStr);
          } else {
            // Wait 5 seconds before retrying
            delay(1000);
          }
        }
      } else {
        //Serial.println("Publicando 2:");
        mqttClient.publish(topic, leituraStr);
      }
      
      //libera as concatenações
      enviou = 1;
    }
    //fim MQTT
     
    leitura = 0;
    
    delay(2000);
  }
  
  Serial.println("Esperando 2 segundos");
  delay(2000);
  
  if (enviou == 1) {
      ultimoEnvio = millis();
      enviou = 0;
      enviando = 0;
  }
  
  mqttClient.loop();
}
