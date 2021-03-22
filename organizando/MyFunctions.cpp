#include "MyFunctions.h"
#include "Arduino.h"

void MyFunctions::sendData(const char *topic, const char *message, PubSubClient mqttClient) {
  if (mqttClient.connect("mobg")) {
      mqttClient.publish(topic, message);
  }
}
