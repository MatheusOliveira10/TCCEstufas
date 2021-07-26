import paho.mqtt.client as mqtt


def on_connect(client, userdata, flags, rc):  
    print("Conectado com o código de retorno {0}".format(str(rc)))  
    client.subscribe("mobg/#") 


def on_message(client, userdata, msg):  
    print("Mensagem recebida -> " + msg.topic + " " + str(msg.payload)) 


client = mqtt.Client("mobg") 
client.on_connect = on_connect  
client.on_message = on_message  
client.connect('test.mosquitto.org', 1883, 17300)
client.loop_forever()  