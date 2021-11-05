import React, { useEffect, useState } from 'react'
import { Header, Divider, Grid, Icon } from 'semantic-ui-react'
// import LineChart from '../components/LineChart'
import { colors } from '../assets/js/customStyles'
import mqtt from 'mqtt'
import axios from 'axios'
import Cultura from '../components/Cultura'
import { useDispatch, useSelector } from 'react-redux'
import * as AppActions from '../store/actions/app'

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
    const dispatch = useDispatch();
    const culturas = useSelector(state => state.app.culturas)
    const controladores = useSelector(state => state.app.controladores)
    const sensores = useSelector(state => state.app.sensores)
    const leituras = useSelector(state => state.app.leituras)

    const handleMQTT = () => {
        var client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

        client.on('connect', function () {
            client.subscribe('mobg/#', { qos: 2 })
        })

        client.on('message', async function (topic, message) {
            await dispatch(AppActions.setLeituras(oldData => [...oldData, { time: oldData.length, value: message }]));
        })
    }

    const getLeituras = async () => {
        let response = await axios.get('/leituras')

        await dispatch(AppActions.setCulturas(response.data.culturas))
        await dispatch(AppActions.setControladores(response.data.controladores))
        await dispatch(AppActions.setSensores(response.data.sensores))
        await dispatch(AppActions.setLeituras(response.data.leituras))
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

