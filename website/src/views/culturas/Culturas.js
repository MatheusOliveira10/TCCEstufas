import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button, Message } from 'semantic-ui-react'
import uniqid from 'uniqid'
import axios from 'axios'

const val = [
    {
        id: 1,
        descricao: 'Estufa 1',
        ativa: true
    },
    {
        id: 2,
        descricao: 'Estufa 2',
        ativa: false
    }
]


const Culturas = () => {
    const [valores, setValores] = useState([])
    const [descricao, setDescricao] = useState('')
    const [ativa, setIsAtiva] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(false)
    
    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    useEffect(async () => {
        let response

        try {
            response = await axios.get('/culturas')
        }
        catch(e) {

        }
        // setValores(val)

        setValores(response.data.map(item => {
            return {...item, ativa: Boolean(item.ativa)}
        }))
    }, [])

    const salvar = async () => {
        let response;

        if(isEditing) {
            let aux = valores;

            aux[index].descricao = descricao;
            aux[index].ativa = ativa;

            try {
                await axios.put('/culturas', aux[index])

                setColor('green')
                setText(`Cultura ${aux[index].descricao} editada com sucesso`)
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
                response = await axios.post('/culturas', {
                    descricao,
                    ativa
                })

                setColor('green')
                setText(`Cultura ${descricao} criada com sucesso`)
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
                    descricao,
                    ativa
                }])
            }
        }

        setDescricao('')
        setIsAtiva(true)
    }

    const editar = async (id) => {
        let index = valores.findIndex(item => item.id === id)

        await setIsEditing(true)
        await setIndex(index)

        await setDescricao(valores[index].descricao)
        await setIsAtiva(valores[index].ativa)
    }

    const deletar = async (id) => {
        let cultura = valores.find(item => item.id == id)

        try {
            await axios.delete('/culturas', { 
                data: {
                    id
                } 
            })

            setColor('green')
            setText(`Cultura ${cultura.descricao} deletada com sucesso`)
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

        setDescricao('')
        setIsAtiva(true)
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
                <h1>Culturas</h1>
            </Grid.Column>
        </Grid>

        <Form style={{ marginTop: 20 }}>
            <Form.Group widths='equal'>
                <Form.Input value={descricao} onChange={item => setDescricao(item.target.value)} label='Descrição' placeholder='Descrição' />
                <Form.Field>
                    <label>Está Ativa?</label>
                    <Checkbox checked={ativa} onChange={() => { setIsAtiva(!ativa) }} toggle style={{ marginTop: 5 }} />
                </Form.Field>
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
            headers={['Descrição', 'Ativa?']}
            keys={['descricao', 'ativa']}
            values={valores} 
            actions={actions} 
            isEditing={isEditing}
            index={index}/>
    </div>
}

export default Culturas

