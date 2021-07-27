#include <ArduinoJson.h>
#include <UIPEthernet.h>
#include <SPI.h>
#include "PubSubClient.h"
#include "MyFunctions.h"

uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05};
byte ip[] = { 192, 168, 8, 185 };
char* sensores[20];
char* portas[20];
int tipoPorta[20];
int i, numElementos;
EthernetClient ethClient;
PubSubClient mqttClient;
MyFunctions myFunctions;

void setup() {
  // Inicializa porta Serial
  Serial.begin(9600);
  while (!Serial) continue;

  // Inicializa Ethernet
  while (Ethernet.begin(mac) != 0) {
    Serial.println(F("Deu ruim no Ethernet"));
    //Não faz sentido seguir
    while(true);
  }
  delay(1000);

  Serial.println(F("Conectando..."));

  ethClient.setTimeout(10000);
  if (!ethClient.connect("tccmatheusebruno.ddns.net", 80)) {
    Serial.println(F("Conexao falhou"));
    return;
  }

  Serial.println(F("Conectado!"));

  // Envio request HTTP
  ethClient.println(F("GET / HTTP/1.0"));
  ethClient.println(F("Host: tccmatheusebruno.ddns.net"));
  ethClient.println(F("Connection: close"));
  if (ethClient.println() == 0) {
    Serial.println(F("Failed to send request"));
    ethClient.stop();
    return;
  }
  
  // Check HTTP status
  char status[32] = {0};
  ethClient.readBytesUntil('\r', status, sizeof(status));
  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {
    Serial.print(F("Resposta inesperada: "));
    Serial.println(status);
    
    ethClient.stop();
    return;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!ethClient.find(endOfHeaders)) {
    Serial.println(F("Resposta Inválida"));
    ethClient.stop();
    return;
  }

  // Allocate the JSON document
  const size_t capacity = 200;
  DynamicJsonDocument doc(capacity);

  // Parse JSON object
  DeserializationError error = deserializeJson(doc, ethClient);
  
  if (error) {
    Serial.print(F("deserializeJson() falhou: "));
    Serial.println(error.f_str());
    ethClient.stop();
    return;
  }

  JsonArray arr = doc.as<JsonArray>();

  i = 0;
  for (JsonVariant value : arr) {
      sensores[i] = value["id"].as<char*>();
      tipoPorta[i] = value["tipoPorta"].as<int>();
      portas[i] = value["porta"].as<char*>();
      i++;
  }

  for(i = 0; i < arr.size(); i++) {
    Serial.println("ID Sensor: " + sensores[i]);
    Serial.println("É porta analógica? " + nomes[i]);
    Serial.println("Porta:" + portas[i]);
  }

  numElementos = arr.size();

  mqttClient.setClient(ethClient);
  mqttClient.setServer("test.mosquitto.org", 1883);
}

void loop() {   
  for(i = 0; i < numElementos; i++) {
    //concatenando string para envio do tópico
    const size_t len1 = strlen("mobg/");
    const size_t len2 = strlen(sensores[i]);
    char *topic = malloc(len1 + len2 + 1); // +1 para o \0

    memcpy(topic, "mobg/", len1);
    memcpy(topic + len1, sensores[i], len2 + 1); 
    
    //alocando espaço para a mensagem
    char *message = malloc(4); // +1 para o \0

    //passando valor para a mensagem
    //aqui no lugar do "10" vai o conteúdo da leitura
    //podemos montar uma função pra isso, por exemplo lerSensor(porta, tipoPorta), que retorna uma string
    memcpy(message, "10", 4);

    // envia a mensagem via MQTT
    myFunctions.sendData(topic, message, mqttClient);

    //libera as concatenações
    free(topic);
    free(message);
  }

  delay(1000);
}
