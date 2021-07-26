import paho.mqtt.client as paho

broker="test.mosquitto.org"
port=1883

def on_publish(client,userdata,result):             #create function for callback
    print("data published \n")
    pass

client1= paho.Client("ClienteMobg") #create client object
client1.on_publish = on_publish  #assign function to callback
client1.connect(broker,port)     #establish connection
print(client1.publish("mobg/1", 6))            #publish