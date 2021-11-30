import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Grid, Message } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import moment from 'moment';
import uniqid from 'uniqid';
import { DateRangePicker } from 'react-date-range';
import { pt } from 'react-date-range/src/locale'

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const cores = [
    "#00a4df",
    "#21b2aa"
];

const Relatorios = () => {
    let refChart = useRef();
    const [data, setData] = useState({
        labels: [],
        datasets: [],
        key: uniqid()
    })

    const [culturas, setCulturas] = useState([])
    const [controladores, setControladores] = useState([])
    const [sensores, setSensores] = useState([])
    const [leituras, setLeituras] = useState([])
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })

    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    const getLeituras = async () => {
        let response;
        
        try {
            response = await axios.get('/leituras')
        }
        catch(e) {
            setColor('red')
            setText(e.response.data.mensagem || e.message)
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 4000)
        }

        let { culturas, controladores, sensores, leituras } = response.data
        await setCulturas(culturas)
        await setControladores(controladores)
        await setSensores(sensores)
        await setLeituras(leituras)

        montarRelatorio(culturas, controladores, sensores)
    }

    const handleDismiss = () => {
        setVisible(false)
    }

    const montarRelatorio = async (culturas, controladores, sensores, selectionRange = {startDate: new Date(), endDate: new Date()}) => {
        let periodo = `${moment(selectionRange.startDate).format('DD/MM/YYYY')} - ${moment(selectionRange.endDate).format('DD/MM/YYYY')}`
        
        let newData = {
            labels: [],
            datasets: [],
            key: uniqid()
        }

        let response;
        
        try {
            response = await axios.get('/relatorio', { params: { 'prd': periodo } })
        }
        catch(e) {
            setColor('red')
            setText(e.response.data.mensagem || e.message)
            setVisible(true)
            // setTimeout(() => {
            //     setVisible(false)
            // }, 4000)

            return;
        }

        let leiturasRelatorio = response.data
        let dataIni = moment(selectionRange.startDate).format('YYYY-MM-DD')
        let date = moment(dataIni)
        let dateFinal = moment(selectionRange.endDate)

        while (dateFinal.isSameOrAfter(date)) {
            newData.labels.push(date.format('DD/MM/YYYY'))

            date.add(1, 'day')
        }
        culturas.forEach((item, index) => {
            let controladoresAux = controladores.filter(con => con.cultura_id === item.id)
            
            controladoresAux.forEach(con => {
                let sensoresAux = sensores.filter(sensor => sensor.controlador_id == con.id)

                sensoresAux.forEach(async sensor => {
                    let dataset = {
                        label: sensor.descricao,
                        data: [],
                        fill: false,
                        backgroundColor: cores[index],
                        borderColor: cores[index],
                        uniqid: uniqid()
                    }

                    date = moment(dataIni)

                    while (dateFinal.isSameOrAfter(date)) {
                        let leitura = leiturasRelatorio.find(leitura => {
                            return leitura.data === date.format('DD/MM/YYYY') && leitura.sensor_id == sensor.id
                        })

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
        setData(newData)

        if(refChart.current != null) {
            refChart.current.data = newData
            refChart.current.update()
        }
    }

    const handleDateRangeChange = (date) => { 
        setSelectionRange({
            ...selectionRange, 
            startDate: date.selection.startDate, 
            endDate: date.selection.endDate
        })
    
        montarRelatorio(culturas, controladores, sensores, {...date.selection})
    }

    useEffect(() => {
        getLeituras()
    }, [])

    return <>
        <Grid>
            {visible &&
                <Grid.Row>
                    <Message onDismiss={handleDismiss} color={color} style={{ flexGrow: 1 }} floating>
                        {text}
                    </Message>
                </Grid.Row>
            }
            <Grid.Row>
                <Grid.Column floated='left' width={16}>
                    <h1>
                        Relatório de Leituras
                    </h1>
                    {/* <Button onClick={() => {}} color='primary' floated='right' style={{ position: 'absolute', top: 5, right: 0}}>
                        Filtrar
                    </Button> */}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <DateRangePicker
                    locale={pt}
                    showDateDisplay={false}
                    ariaLabels= {{
                        monthPicker: "PropTypes.string",
                        yearPicker: "PropTypes.string",
                        prevButton: "PropTypes.string",
                        nextButton: "PropTypes.string",
                    }}
                    ranges={[selectionRange]}
                    onChange={handleDateRangeChange}
                />
            </Grid.Row>
            <Line ref={refChart} id={uniqid()} redraw={true} data={data} options={options} />

            <Grid.Row style={{ paddingBottom: 0 }}>
                <h3>Legenda:</h3>
            </Grid.Row>
            <Grid.Row>
                {
                    culturas.map((item, index) => {
                        return <div style={{ display: 'flex', flexDirection: 'row' }} key={uniqid()}>
                            <div style={{ width: 20, height: 20, backgroundColor: cores[index], marginRight: 4 }}></div>
                            <div style={{ marginRight: 8 }}>{item.descricao}</div>
                        </div>
                    })
                }
            </Grid.Row>
        </Grid>
    </>
}

export default Relatorios