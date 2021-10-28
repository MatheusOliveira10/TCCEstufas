import React, { useEffect, useState } from 'react'
import { Header, Divider, Grid, Icon } from 'semantic-ui-react'
import LineChart from '../components/LineChart'
import { colors } from '../assets/js/customStyles'
import mqtt from 'mqtt'
import axios from 'axios'
import Cultura from '../components/Cultura'

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
    const [culturas, setCulturas] = useState([])
    const [controladores, setControladores] = useState([])
    const [sensores, setSensores] = useState([])
    const [leituras, setLeituras] = useState([])

    const handleMQTT = () => {
        var client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

        client.on('connect', function () {
            client.subscribe('mobg/#', { qos: 2 })
        })

        client.on('message', async function (topic, message) {
            await setLeituras(oldData => [...oldData, { time: oldData.length, value: message }]);
        })
    }

    const getLeituras = async () => {
        let response = await axios.get('/leituras')

        console.log(response.data)

        await setCulturas(response.data.culturas)
        await setControladores(response.data.controladores)
        await setSensores(response.data.sensores)
        await setLeituras(response.data.leituras)
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
                    {culturas.map(cultura => {
                        return <Cultura id={cultura.id} 
                                        culturas={culturas} 
                                        controladores={controladores}
                                        sensores={sensores}
                                        leituras={leituras} />
                    })}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>)
}

export default Home

