import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button } from 'semantic-ui-react'
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
    
    useEffect(async () => {
        let response = await axios.get('/culturas')
        // setValores(val)
        console.log(response.data)
        setValores(response.data.map(item => {
            return {...item, ativa: Boolean(item.ativa)}
        }))
    }, [])

    const salvar = async () => {
        if(isEditing) {
            let aux = valores;

            aux[index].descricao = descricao;
            aux[index].ativa = ativa;

            try {
                await axios.put('/culturas', aux[index])
            }
            catch (e) {
                alert(e.response.data.mensagem)
            }
            finally {
                await setValores(aux)
                await setIsEditing(false)
            }
        } else {
            try {
                await axios.post('/culturas', {
                    id: uniqid(),
                    descricao,
                    ativa
                })
            }
            catch (e) {
                alert(e.response.data.mensagem)
            }
            finally {
                await setValores([...valores,  {
                    id: uniqid(),
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
        try {
            await axios.delete('/culturas', { 
                data: {
                    id
                } 
            })
        }
        catch (e) {
            alert(e.response.data.mensagem)
        }
        finally {
            await setValores([...valores,  {
                id: uniqid(),
                descricao,
                ativa
            }])
        }

        await setValores(valores.filter(item => item.id !== id))
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

    return <div>
        <Grid>
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

