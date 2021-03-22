#include <ArduinoJson.h>
#include <UIPEthernet.h>
#include <SPI.h>

uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05};
byte ip[] = { 192, 168, 8, 185 };
int sensores[20];
char* nomes[20];
int i;

void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  while (!Serial) continue;

  // Initialize Ethernet library
  //byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
  if (Ethernet.begin(mac) == 0) {
    Serial.println(F("Failed to configure Ethernet"));
    return;
  }
  delay(1000);

  Serial.println(F("Connecting..."));

  // Connect to HTTP server
  EthernetClient client;
  client.setTimeout(10000);
  if (!client.connect("tccmatheusebruno.herokuapp.com", 80)) {
    Serial.println(F("Connection failed"));
    return;
  }

  Serial.println(F("Connected!"));

  // Send HTTP request
  client.println(F("GET / HTTP/1.0"));
  client.println(F("Host: tccmatheusebruno.herokuapp.com"));
  client.println(F("Connection: close"));
  if (client.println() == 0) {
    Serial.println(F("Failed to send request"));
    client.stop();
    return;
  }
  
  // Check HTTP status
  char status[32] = {0};
  client.readBytesUntil('\r', status, sizeof(status));
  if (strcmp(status, "HTTP/1.1 200 OK") != 0) {
    Serial.print(F("Unexpected response: "));
    Serial.println(status);
    
    client.stop();
    return;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders)) {
    Serial.println(F("Invalid response"));
    client.stop();
    return;
  }

  // Allocate the JSON document
  // Use arduinojson.org/v6/assistant to compute the capacity.
  const size_t capacity = 200;
  DynamicJsonDocument doc(capacity);

  // Parse JSON object
  DeserializationError error = deserializeJson(doc, client);
  
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    client.stop();
    return;
  }

  // using C++11 syntax (preferred):
  for (JsonVariant value : arr) {
      sensores[i] = value["porta"].as<int>();
      nomes[i] = value["sensor"].as<char*>();
  }

  for(i = 0; i < arr.size; i++) {
    Serial.println(sensores[i]);
    Serial.println(nomes[i]);
  }

  // Disconnect
  client.stop();
}

void loop() {
}
