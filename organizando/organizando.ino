#include <ArduinoJson.h>
#include <UIPEthernet.h>
#include <SPI.h>
#include "PubSubClient.h"
#include "MyFunctions.h"

uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05};
byte ip[] = { 192, 168, 8, 185 };
char* sensores[20];
char* nomes[20];
int i, numElementos;
EthernetClient ethClient;
PubSubClient mqttClient;
MyFunctions myFunctions;

void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  while (!Serial) continue;

  // Initialize Ethernet library
  if (Ethernet.begin(mac) == 0) {
    Serial.println(F("Failed to configure Ethernet"));
    return;
  }
  delay(1000);

  Serial.println(F("Connecting..."));

  ethClient.setTimeout(10000);
  if (!ethClient.connect("tccmatheusebruno.herokuapp.com", 80)) {
    Serial.println(F("Connection failed"));
    return;
  }

  Serial.println(F("Connected!"));

  // Send HTTP request
  ethClient.println(F("GET / HTTP/1.0"));
  ethClient.println(F("Host: tccmatheusebruno.herokuapp.com"));
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
    Serial.print(F("Unexpected response: "));
    Serial.println(status);
    
    ethClient.stop();
    return;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!ethClient.find(endOfHeaders)) {
    Serial.println(F("Invalid response"));
    ethClient.stop();
    return;
  }

  // Allocate the JSON document
  const size_t capacity = 200;
  DynamicJsonDocument doc(capacity);

  // Parse JSON object
  DeserializationError error = deserializeJson(doc, ethClient);
  
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    ethClient.stop();
    return;
  }

  JsonArray arr = doc.as<JsonArray>();

  i = 0;
  for (JsonVariant value : arr) {
      sensores[i] = value["porta"].as<char*>();
      nomes[i] = value["sensor"].as<char*>();
      i++;
  }

  for(i = 0; i < arr.size(); i++) {
    Serial.println(sensores[i]);
    Serial.println(nomes[i]);
  }

  numElementos = arr.size();

  mqttClient.setClient(ethClient);
  mqttClient.setServer("test.mosquitto.org", 1883);
}

void loop() {   
  for(i = 0; i < numElementos; i++) {
    const size_t len1 = strlen("mobg/");
    const size_t len2 = strlen(sensores[i]);
    char *topic = malloc(len1 + len2 + 1); // +1 para o \0
    char *message = malloc(4); // +1 para o \0
    memcpy(topic, "mobg/", len1);
    memcpy(topic + len1, sensores[i], len2 + 1); 
    memcpy(message, "10", 4);
    //topic = (char *)"mobg/" + sensores[i];
  
    myFunctions.sendData(topic, message, mqttClient);
    free(topic);
    free(message);
  }

  delay(1000);
}
