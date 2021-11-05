import React, { useEffect, useRef, useState } from 'react';
import { Grid, ModalContent } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../store/actions/app'
import moment from 'moment';
import uniqid from 'uniqid';

const initialData = {
    labels: [],
    datasets: [],
    key: uniqid()
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const Relatorios = () => {
    const dispatch = useDispatch();
    let refChart = useRef();
    const [data, setData] = useState(initialData)
    // let data = (canvas, data = initialData) => {
    //     const ctx = canvas.getContext('2d')
    //     const gradient = ctx.createLinearGradient(0,0,100,0);
    
    //     console.log(ctx)

    //     return data
    // };
    const [culturas, setCulturas] = useState([])
    const [controladores, setControladores] = useState([])
    const [sensores, setSensores] = useState([])
    const [leituras, setLeituras] = useState([])

    const getLeituras = async () => {
        let response = await axios.get('/leituras')
        let { culturas, controladores, sensores, leituras } = response.data
        await setCulturas(culturas)
        await setControladores(controladores)
        await setSensores(sensores)
        await setLeituras(leituras)

        montarRelatorio(culturas, controladores, sensores)
    }


    const montarRelatorio = async (culturas, controladores, sensores) => {
        let newData = initialData
        let response = await axios.get('/relatorio', { params: { 'prd': "01/10/2021 - 31/10/2021" } })
        let leituras = response.data
        let dataIni = '2021-10-13'

        let date = moment(dataIni)
        let dateFinal = moment('2021-10-20')

        while (dateFinal.isSameOrAfter(date)) {
            newData.labels.push(date.format('DD/MM/YYYY'))

            date.add(1, 'day')
        }

        culturas.forEach(item => {
            let controladoresAux = controladores.filter(con => con.cultura_id === item.id)
            controladoresAux.forEach(con => {
                let sensoresAux = sensores.filter(sensor => sensor.controlador_id == con.id)
                sensoresAux.forEach(async sensor => {
                    let dataset = {
                        label: sensor.descricao,
                        data: [],
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                        uniqid: uniqid(),
                    }

                    date = moment(dataIni)

                    while (dateFinal.isSameOrAfter(date)) {
                        let leitura = leituras.find(leitura => leitura.data === date.format('DD/MM/YYYY') && leitura.sensor_id == sensor.id)

                        if (leitura) {
                            dataset.data.push(parseFloat(leitura.valor))
                        } else {
                            dataset.data.push(0.00)
                        }
                        date.add(1, 'day')
                    }

                    newData.datasets.push(dataset)
                })
            })
        })
        newData.key = uniqid();
        console.log(newData)
        setData(newData)
        refChart.data = newData
        refChart.update()
    }

    useEffect(() => {
        getLeituras()
    }, [])

    return <>
        <Grid>
            <Grid.Row>
                <Grid.Column floated='left' width={5}>
                    <h1>Relatórios</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Line ref={(ref) => refChart = ref} id={uniqid()} redraw={true} data={data} options={options} />
            </Grid.Row>
        </Grid>
    </>
}

export default Relatorios