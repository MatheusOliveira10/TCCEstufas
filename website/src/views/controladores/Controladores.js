import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button, Message } from 'semantic-ui-react'
import uniqid from 'uniqid'
import axios from 'axios'

const val = [
    {
        id: 1,
        nome: 'Arduino Mega 2560 - Início',
    },
    {
        id: 2,
        nome: 'Arduino Mega 2560 - Janela',
    }
]


const Controladores = () => {
    const [valores, setValores] = useState([])
    const [nome, setNome] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(false)
    const endpoint = '/controladores'

    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(async () => {
        try {
            let response = await axios.get(endpoint)

            setValores(response.data)
        }
        catch(e) {
            setColor('red')
            setText(e.response.data.mensagem || e.message)
            setVisible(true)
        }
        
        // setValores(val)
    }, [])

    const salvar = async () => {
        let response;

        if(isEditing) {
            let aux = valores;

            aux[index].nome = nome;

            try {
                await axios.put(endpoint, aux[index])

                setColor('green')
                setText(`Controlador ${aux[index].nome} editado com sucesso`)
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
                    nome
                })

                setColor('green')
                setText(`Controlador ${nome} criado com sucesso`)
                setVisible(true)    
            }
            catch (e) {
                setColor('red')
                setText(e.response.data.mensagem || e.message)
                setVisible(true)
            }
            finally {
                await setValores([...valores,  {
                    id: response.data[0].id,
                    nome
                }])
            }
        }

        setNome('')
    }

    const editar = async (id) => {
        let index = valores.findIndex(item => item.id === id)

        await setIsEditing(true)
        await setIndex(index)

        await setNome(valores[index].nome)
    }

    const deletar = async (id) => {
        let controlador = valores.find(item => item.id === id)

        try {
            await axios.delete(endpoint, { 
                data: {
                    id
                } 
            })

            setColor('green')
            setText(`Controlador ${controlador.nome} deletado com sucesso`)
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

        setNome('')
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
                <h1>Controladores</h1>
            </Grid.Column>
        </Grid>

        <Form style={{ marginTop: 20 }}>
            <Form.Group widths='equal'>
                <Form.Input value={nome} onChange={item => setNome(item.target.value)} label='Nome' placeholder='Nome' />
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

        <Table
            unstackable
            headers={['Nome']}
            keys={['nome']}
            values={valores} 
            actions={actions} 
            isEditing={isEditing}
            index={index}/>
    </div>
}

export default Controladores