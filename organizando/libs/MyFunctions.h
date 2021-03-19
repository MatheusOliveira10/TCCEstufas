#include <Arduino.h>
#include <UIPEthernet.h>
#include "PubSubClient.h"

#ifndef MyFunctions_h
#define MyFunctions_h
class MyFunctions
{
   public:
    void sendData(const char* topic, const char* message, PubSubClient mqttClient);
   private:
          
};
#endif
