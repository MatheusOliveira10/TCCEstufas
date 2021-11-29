import React, { useEffect, useState } from 'react'
import { Header, Divider, Grid, Icon } from 'semantic-ui-react'
// import LineChart from '../components/LineChart'
import { colors } from '../assets/js/customStyles'
import mqtt from 'mqtt'
import axios from 'axios'
import Cultura from '../components/Cultura'
import { useDispatch, useSelector } from 'react-redux'
import * as AppActions from '../store/actions/app'
import moment from 'moment'
import uniqid from 'uniqid'

const Home = () => {
    const dispatch = useDispatch();
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
            let sensor_id = topic.split('/')[1]
            
            console.log({ 
                created_at: moment().format('YYYY-MM-DD H:mm:ss'),
                id: uniqid(),
                sensor_id,
                valor: parseInt(message.toString())
            })

            await setLeituras(leituras => [
                { 
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    id: uniqid(),
                    sensor_id,
                    valor: parseInt(message.toString())
                },
                ...leituras
            ]);
        })
    }

    const getLeituras = async () => {
        let response = await axios.get('/leituras')

        await setCulturas(response.data.culturas)
        await setControladores(response.data.controladores)
        await setSensores(response.data.sensores)
        await setLeituras(response.data.leituras)
    }

    useEffect(() => {
        handleMQTT()
        getLeituras()
    }, [])

    useEffect(() => {
        console.log(leituras.length)
    }, [leituras])

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

