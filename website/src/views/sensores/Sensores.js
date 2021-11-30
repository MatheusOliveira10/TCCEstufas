import React, { useEffect, useState } from 'react'
import { Form, Table, Grid, Button, Icon, Message } from 'semantic-ui-react'
import uniqid from 'uniqid'
import axios from 'axios'

const val = [
    {
        id: 1,
        descricao: 'Sensor de Umidade - Porta',
        porta: 12,
        tipo_porta: 0,
        tipo_sensor: 'U',
        unidade: '%',
        referencia_minima: 200,
        referencia_maxima: 500,
        porta_atuador_minimo: 12,
        porta_atuador_maximo: 13,
        controlador_id: 1
    },
    {
        id: 2,
        descricao: 'Sensor de Luminosidade - Teto',
        porta: 13,
        tipo_porta: 1,
        tipo_sensor: 'L',
        unidade: 'lux',
        referencia_minima: 200,
        referencia_maxima: 500,
        porta_atuador_minimo: 12,
        porta_atuador_maximo: null,
        controlador_id: 2
    },
    {
        id: 3,
        descricao: 'Sensor de Umidade do Solo - Meio',
        porta: 14,
        tipo_porta: 0,
        tipo_sensor: 'H',
        unidade: '',
        referencia_minima: 200,
        referencia_maxima: 500,
        porta_atuador_minimo: 14,
        porta_atuador_maximo: 11,
        controlador_id: 1
    }
]


const Sensores = () => {
    const [valores, setValores] = useState([])

    const [descricao, setDescricao] = useState('')
    const [porta, setPorta] = useState('')
    const [tipoPorta, setTipoPorta] = useState('')
    const [tipoSensor, setTipoSensor] = useState('')
    const [referenciaMinima, setReferenciaMinima] = useState('')
    const [referenciaMaxima, setReferenciaMaxima] = useState('')
    const [portaMinimo, setPortaMinimo] = useState('')
    const [portaMaximo, setPortaMaximo] = useState('')
    const [unidade, setUnidade] = useState('')
    const [controlador_id, setControlador] = useState(null)
    const [controladores, setControladores] = useState([])
    const [optionsControladores, setOptionsControladores] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(false)
    const endpoint = '/sensores'

    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(async () => {
        let response = await axios.get(endpoint)

        setValores(response.data)

        try {
            response = await axios.get('/controladores')
        }
        catch(e) {
            setColor('red')
            setText(e.response.data.mensagem || e.message)
            setVisible(true)
        }

        setControladores(response.data)
        let optionsControladores = response.data.map(item => { 
            return { 
                key: uniqid(), 
                text: item.nome, 
                value: item.id 
            } 
        })
        setOptionsControladores(optionsControladores)
    }, [])

    const limparFormulario = () => {
        setDescricao('')
        setPorta('')
        setReferenciaMinima('')
        setReferenciaMaxima('')
        setPortaMinimo('')
        setPortaMaximo('')
        setUnidade('')
        setTipoPorta(null)
        setTipoSensor(null)
        setControlador(null)
    }

    const salvar = async () => {
        let response;

        if (isEditing) {
            let aux = valores;

            aux[index].descricao = descricao;
            aux[index].porta = porta;
            aux[index].tipo_porta = tipoPorta;
            aux[index].tipo_sensor = tipoSensor;
            aux[index].controlador_id = controlador_id;
            aux[index].referencia_minima = referenciaMinima;
            aux[index].referencia_maxima = referenciaMaxima;
            aux[index].porta_atuador_minimo = portaMinimo;
            aux[index].porta_atuador_maximo = portaMaximo;
            aux[index].unidade = unidade;

            try {
                await axios.put(endpoint, aux[index])

                setColor('green')
                setText(`Sensor ${aux[index].descricao} editado com sucesso`)
                setVisible(true)    
            }
            catch (e) {
                setColor('red')
                setText(e.response.data.mensagem || e.message)
                setVisible(true)
            }
            finally {
                await setValores(aux)
                await setIsEditing(false)
            }
        } else {
            try {
                response = await axios.post(endpoint, {
                    descricao,
                    porta,
                    tipo_porta: tipoPorta,
                    controlador_id: controlador_id,
                    tipo_sensor: tipoSensor,
                    referencia_minima: referenciaMinima,
                    referencia_maxima: referenciaMaxima,
                    porta_atuador_minimo: portaMinimo,
                    porta_atuador_maximo: portaMaximo,
                    unidade
                })

                setColor('green')
                setText(`Sensor ${descricao} criado com sucesso`)
                setVisible(true)    
            }
            catch (e) {
                setColor('red')
                setText(e.response.data.mensagem || e.message)
                setVisible(true)
            }
            finally {
                await setValores([...valores, {
                    id: response.data[0].id,
                    descricao,
                    porta,
                    tipo_porta: tipoPorta,
                    controlador_id: controlador_id,
                    tipo_sensor: tipoSensor,
                    referencia_minima: referenciaMinima,
                    referencia_maxima: referenciaMaxima,
                    porta_atuador_minimo: portaMinimo,
                    porta_atuador_maximo: portaMaximo,
                    unidade
                }])
            }
        }

        limparFormulario()
    }

    const editar = async (id) => {
        let index = valores.findIndex(item => item.id === id)

        await setIsEditing(true)
        await setIndex(index)

        await setDescricao(valores[index].descricao)
        await setPorta(valores[index].porta)
        await setTipoPorta(valores[index].tipo_porta)
        await setControlador(valores[index].controlador_id)
        await setReferenciaMinima(valores[index].referencia_minima)
        await setReferenciaMaxima(valores[index].referencia_maxima)
        await setPortaMinimo(valores[index].porta_atuador_minimo ?? '')
        await setPortaMaximo(valores[index].porta_atuador_maximo ?? '')
        await setUnidade(valores[index].unidade)
        await setTipoSensor(valores[index].tipo_sensor)
    }

    const deletar = async (id) => {
        let sensor = valores.find(item => item.id === id)

        try {
            await axios.delete(endpoint, { 
                data: {
                    id
                } 
            })

            setColor('green')
            setText(`Sensor ${sensor.descricao} deletado com sucesso`)
            setVisible(true)    
        }
        catch (e) {
            setColor('red')
            setText(e.response.data.mensagem || e.message)
            setVisible(true)
        }
        finally {
            await setValores(valores.filter(item => item.id !== id))
        }
    }

    const cancelar = async () => {
        await setIsEditing(false)

        limparFormulario()
    }

    const getTipoSensorPorExtenso = (tipoSensor) => {
        switch (tipoSensor) {
            case 'L':
                return "Luminosidade"
            case 'H':
                return "Higrômetro"
            case 'U':
                return "Umidade"
            case 'T':
                return "Temperatura do Ar"
        }
    }

    const actions = [
        {
            icon: 'pencil',
            color: 'green',
            action: editar
        },
        {
            icon: 'times',
            color: 'red',
            action: deletar
        }
    ]

    const optionsTipoPorta = [
        { key: uniqid(), text: 'Digital', value: 0 },
        { key: uniqid(), text: 'Analógica', value: 1 }
    ]

    const optionsTipoSensor = [
        { key: uniqid(), text: 'Luminosidade', value: 'L' },
        { key: uniqid(), text: 'Umidade do Ar', value: 'U' },
        { key: uniqid(), text: 'Higrômetro', value: 'H' },
        { key: uniqid(), text: 'Temperatura do Ar', value: 'T' }
    ]

    const handleDismiss = () => {
        setVisible(false)
    }

    return <div>
        <Grid>
            {visible &&
                <Grid.Row>
                    <Message onDismiss={handleDismiss} color={color} style={{ flexGrow: 1 }} floating>
                        {text}
                    </Message>
                </Grid.Row>
            }
            <Grid.Column floated='left' width={5}>
                <h1>Sensores</h1>
            </Grid.Column>
        </Grid>

        <Form style={{ marginTop: 20 }}>
            <Form.Group widths='equal'>
                <Form.Input value={descricao} onChange={item => setDescricao(item.target.value)} label='Descrição' placeholder='Descrição' />
                <Form.Input type={'number'} value={porta} onChange={item => setPorta(item.target.value)} label='Número da Porta' placeholder='Número da Porta' />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Select options={optionsTipoPorta} onChange={(e, { value }) => { setTipoPorta(value) }} value={tipoPorta} label='Tipo da Porta' placeholder='Tipo da Porta' />
                <Form.Select options={optionsControladores} label='Controlador' placeholder='Controlador' onChange={(e, { value }) => { setControlador(value) }} value={controlador_id} />
                <Form.Select options={optionsTipoSensor} label='Tipo do Sensor' placeholder='Tipo do Sensor' onChange={(e, { value }) => { setTipoSensor(value) }} value={tipoSensor} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input value={referenciaMinima} onChange={item => setReferenciaMinima(item.target.value)} label='Referência Mínima' placeholder='Referência Mínima' />
                <Form.Input value={referenciaMaxima} onChange={item => setReferenciaMaxima(item.target.value)} label='Referência Máxima' placeholder='Referência Máxima' />
                <Form.Input value={unidade} onChange={item => setUnidade(item.target.value)} label='Unidade' placeholder='ex. %, lux...' />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input value={portaMinimo} onChange={item => setPortaMinimo(item.target.value)} label='Porta do Atuador Mínimo' placeholder='(Leitura abaixo do Mínimo)' />
                <Form.Input value={portaMaximo} onChange={item => setPortaMaximo(item.target.value)} label='Porta do Atuador Máximo' placeholder='(Leitura acima do Máximo)' />
            </Form.Group>
            <Button.Group floated='right' style={{ marginBottom: 20 }}>
                <Button primary onClick={salvar}>
                    Salvar
                </Button>
                <div class="or" data-text="ou"></div>
                <Button onClick={cancelar}>
                    Cancelar
                </Button>
            </Button.Group>
        </Form>

        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key={uniqid()}>Descrição</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Porta</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Tipo da Porta</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Tipo do Sensor</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Ref. Mínima</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Ref. Máxima</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Porta Min.</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Porta Máx.</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Controlador</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Unidade</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Ações</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {valores.map((item, id) => {
                    return <Table.Row active={isEditing && index === id} key={uniqid()}>
                        <Table.Cell key={uniqid()}>{item.descricao}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.porta}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.tipo_porta == 0 ? 'Analógica' : 'Digital'}</Table.Cell>
                        <Table.Cell key={uniqid()}>{getTipoSensorPorExtenso(item.tipo_sensor)}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.referencia_minima}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.referencia_maxima}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.porta_atuador_minimo}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.porta_atuador_maximo}</Table.Cell>
                        <Table.Cell key={uniqid()}>{controladores.find(con => con.id === item.controlador_id)?.nome}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.unidade}</Table.Cell>

                        <Table.Cell className='center aligned'>
                            {actions.map(action => {
                                return <Button icon onClick={() => action.action(item.id)} color={action.color} key={uniqid()}>
                                    <Icon name={action.icon} />
                                </Button>
                            })}
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>
        </Table>
    </div>
}

export default Sensores