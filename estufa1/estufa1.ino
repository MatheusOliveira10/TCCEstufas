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
int parametroMinimo[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
int parametroMaximo[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
int portaAtuador[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
int leituras[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
char tipoSensor[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05};

EthernetClient ethClient;
PubSubClient mqttClient;
DHT dht(A1, DHT11);
char serverMosquitto[20] = "broker.hivemq.com";
int portaMosquitto = 1883;
unsigned long ultimoEnvio;
int numElementos, i;

char endpoint[20] = "/sensores?id=1";
char body[500];

void setup() {
  int err =0;
  
  pinMode(9, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(11, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(A3, INPUT);
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
      parametroMinimo[i] = value["parametroMinimo"].as<int>();
      parametroMaximo[i] = value["parametroMaximo"].as<int>();
      portaAtuador[i] = value["portaAtuador"].as<int>();
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

int* findSensoresPorTipo(char tipo) {
  static int valores[10] = { -1, -1, -1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 };
  int cont = 0;
  int i = 0;
  
  while (tipoSensor[i] != -1) {
    if(tipoSensor[i] == tipo) {
      valores[cont] = i;
      cont++;
    }

    i++;
  }

  return valores;
}

void loop() {  
  int i, j;
  int contadorSensores = 1;
  int leitura = 0;
  int enviou = 0;
  int enviando = 0;
  
  //loop através dos sensores
  //para leitura e envio dos dados da estufa
  for(i = 0; i < numElementos; i++) {
    int* ponteiro;
     
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
        //Serial.print("Higrometro: ");
        leitura += 1024 - analogRead(portas[i]);
        Serial.print("Higrômetro: ");
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
    
    //se o próximo sensor for do mesmo tipo, passa para a próxima iteração
    if(tipoSensor[i] == tipoSensor[i+1]) {
      contadorSensores++;
      continue;  
    }
    
    float media = leitura / contadorSensores;

    //Serial.print("Medição -> Média: ");
    //Serial.println(media);
    //Serial.print("Automação -> Sensor: ");
    //Serial.println(sensores[i]);

    if(media < parametroMinimo[i]) {     
      digitalWrite(portaAtuador[i], LOW);

      //Verifica qual atuador esta ligando e apresenta na porta serial
      if(portaAtuador[i] == 10){
        Serial.println("Lampada Ligada!");
       }else if (portaAtuador[i] == 11){
        Serial.println("Bomba d'agua Ligada!");
       }else{
        Serial.println("Cooler Ligado!");
        }
        //Fim da verificação
        
    } else {
      int deveAtuar = 1;

        //Verificando se o sensor de Temperatura quer desligar a luz
      if(tipoSensor[i] == 'L') {
        int contador = 0;
        int total = 0;
        ponteiro = findSensoresPorTipo('T');
        
        for ( j = 0; j < 4; j++ ) {
          if(*(ponteiro + j) != 6) {
            total += leituras[*(ponteiro + j)];
            contador++;
          }
        }
        Serial.println(total);
        
        if((total / contador) < parametroMinimo[*(ponteiro)]) {
          deveAtuar = 0;
        }
      }
      if(tipoSensor[i] == 'T') {
        
        int contador = 0;
        int total = 0;
        ponteiro = findSensoresPorTipo('L');
          
        for ( j = 0; j < 4; j++ ) {
          if(*(ponteiro + j) != 6) {
            total += leituras[*(ponteiro + j)];
            contador++;
          }
        }
        Serial.println(total);
        if((total / contador) < parametroMinimo[*(ponteiro)]) {
          deveAtuar = 0;
        }
      }

    //Fim da verificação se o sensor de Temperatura quer desligar a luz.
      
      if(deveAtuar == 1) {
        digitalWrite(portaAtuador[i], HIGH);

      //Verifica qual atuador esta ligando e apresenta na porta serial
      if(portaAtuador[i] == 10){
        Serial.println("Lampada Desligada!");
       }else if (portaAtuador[i] == 11){
        Serial.println("Bomba d'agua Desligada!");
       }else{
        Serial.println("Cooler Desligado!");
        }
        //Fim da verificação
        
      }
    }
     
    leitura = 0;
    contadorSensores = 1;
    
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
