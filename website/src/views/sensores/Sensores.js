import React, { useEffect, useState } from 'react'
import { Form, Table, Grid, Button, Icon } from 'semantic-ui-react'
import uniqid from 'uniqid'

const val = [
    {
        id: 1,
        descricao: 'Sensor de Umidade - Porta',
        porta: 12,
        tipo_porta: 0,
        tipo_porta_extenso: 'Analógica',
        controlador: 1
    },
    {
        id: 2,
        descricao: 'Sensor de Luminosidade - Teto',
        porta: 13,
        tipo_porta: 1,
        tipo_porta_extenso: 'Digital',
        controlador: 2
    },
    {
        id: 3,
        descricao: 'Sensor de Umidade do Solo - Meio',
        porta: 14,
        tipo_porta: 0,
        tipo_porta_extenso: 'Analógica',
        controlador: 1
    }
]


const Sensores = () => {
    const [valores, setValores] = useState([])

    const [descricao, setDescricao] = useState('')
    const [porta, setPorta] = useState('')
    const [tipoPorta, setTipoPorta] = useState('')
    const [controlador, setControlador] = useState(null)
    const [controladores, setControladores] = useState([
        {
            id: 1,
            nome: 'Arduino Mega 2560 - Início',
        },
        {
            id: 2,
            nome: 'Arduino Mega 2560 - Janela',
        }
    ])

    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(false)

    useEffect(() => {
        setValores(val)
    }, [])

    const limparFormulario = () => {
        setDescricao('')
        setPorta('')
        setTipoPorta(null)
        setControlador(null)
    }

    const salvar = async () => {
        if (isEditing) {
            let aux = valores;

            aux[index].descricao = descricao;
            aux[index].porta = porta;
            aux[index].tipoPorta = tipoPorta;
            aux[index].controlador = controlador;

            await setValores(aux)
            await setIsEditing(false)
        } else {
            await setValores([...valores, {
                id: uniqid(),
                descricao,
                porta,
                tipoPorta,
                controlador
            }])
        }

        limparFormulario()
    }

    const editar = async (id) => {
        let index = valores.findIndex(item => item.id === id)

        await setIsEditing(true)
        await setIndex(index)

        await setDescricao(valores[index].descricao)
        await setPorta(valores[index].porta)
        await setTipoPorta(valores[index].tipoPorta)
        await setControlador(valores[index].controladorSelecionado)
    }

    const deletar = async (id) => {
        await setValores(valores.filter(item => item.id !== id))
    }

    const cancelar = async () => {
        await setIsEditing(false)

        limparFormulario()
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

    const optionsControladores = [
        { key: uniqid(), text: 'Arduino Mega 2560 - Início', value: 1 },
        { key: uniqid(), text: 'Arduino Mega 2560 - Janela', value: 2 }
    ]

    return <div>
        <Grid>
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
                <Form.Select options={optionsControladores} label='Controlador' placeholder='Controlador' onChange={(e, { value }) => { setControlador(value) }} value={controlador}/>
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

        <Table celled unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell key={uniqid()}>Descrição</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Porta</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Tipo da Porta</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Controlador</Table.HeaderCell>
                    <Table.HeaderCell key={uniqid()}>Ações</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {valores.map((item, id) => {
                    return <Table.Row active={isEditing && index === id} key={uniqid()}>
                        <Table.Cell key={uniqid()}>{item.descricao}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.porta}</Table.Cell>
                        <Table.Cell key={uniqid()}>{item.tipo_porta == 0 ? 'Analógica' : 'Digital'}</Table.Cell>
                        <Table.Cell key={uniqid()}>{controladores.find(con => con.id === item.controlador).nome}</Table.Cell>
                        
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