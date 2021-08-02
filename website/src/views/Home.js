import React, { useEffect, useState } from 'react'
import { Header, Divider, Grid, Icon } from 'semantic-ui-react'
import LineChart from '../components/LineChart'
import { colors } from '../customStyles'
import mqtt from 'mqtt'
import axios from 'axios'

let array = [
    { time: 0, value: 8 },
    { time: 1, value: 5 },
    { time: 2, value: 4 },
    { time: 3, value: 9 },
    { time: 4, value: 1 },
    { time: 5, value: 7 },
    { time: 6, value: 6 },
    { time: 7, value: 3 },
    { time: 8, value: 4 },
    { time: 9, value: 3 }
];

const Home = () => {
    const [data, setData] = useState([])

    const handleMQTT = () => {
        var client = mqtt.connect('wss://test.mosquitto.org:8081')

        client.on('connect', function () {
            client.subscribe('mobg/#', { qos: 2 })
        })

        client.on('message', async function (topic, message) {
            await setData(oldData => [...oldData, { time: oldData.length, value: message }]);
        })
    }

    const getLeituras = async () => {
        let response = await axios.get('/leituras')

        console.log(response.data)

        await setData(response.data)
    }

    useEffect(() => {
        handleMQTT()
        getLeituras()
    }, [])

    return (<>
        <Header style={{ marginTop: 20, color: colors.green }} as='h2' icon textAlign='center'>
            <Icon name='info' />
            Monitoramento da Estufa
        </Header>

        <Divider />

        <Grid stackable>
            <Grid.Row columns='equal'>
                <Grid.Column style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                    {Object.keys(data).map(cultura => {
                        return Object.keys(data[cultura]).map(controlador => {
                            return Object.keys(data[cultura][controlador]).map(sensor => {
                                return Object.keys(data[cultura][controlador][sensor]).map(leitura => {
                                    let registro = data[cultura][controlador][sensor][leitura];
                                    
                                    return registro.cultura_descricao
                                    console.log(data[cultura][controlador][sensor][leitura])
                                })
                            })
                        })
                    })}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>)
}

export default Home

