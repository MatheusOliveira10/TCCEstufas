#include <Wire.h>
#include <BH1750.h>
//Define o sensor BH1750
BH1750 lightMeter;
void setup()
{
  Serial.begin(9600);
  
  Wire.begin();
  //Inicializa o BH1750
  if (lightMeter.begin()) {
    Serial.println("Deu bom");
  } else {
    Serial.println("Deu ruim");  
  }
  
}
void loop()
{
  //Le os valores do sensor de lux
  uint16_t lux = lightMeter.readLightLevel();
  
  //Mostra as informacoes na serial
  Serial.print("Luminosidade: ");
  Serial.print(lux);
  Serial.println(" lux");
  
  delay(1000);
}
