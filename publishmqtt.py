import paho.mqtt.client as paho

broker="broker.hivemq.com"
port=1883

def on_publish(client,userdata,result):             
    print("data published \n")
    pass

client1= paho.Client("mobg") 
client1.on_publish = on_publish  
client1.connect(broker,port)     
print(client1.publish("mobg/2", 35, qos=2)) #simulando envio de mensagem do sensor 2