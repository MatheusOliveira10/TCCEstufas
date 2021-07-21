import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button } from 'semantic-ui-react'
import uniqid from 'uniqid'

const val = [
    {
        id: 1,
        descricao: 'Estufa 1',
        isAtiva: true
    },
    {
        id: 2,
        descricao: 'Estufa 2',
        isAtiva: false
    }
]


const Culturas = () => {
    const [valores, setValores] = useState([])
    const [descricao, setDescricao] = useState('')
    const [isAtiva, setIsAtiva] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [index, setIndex] = useState(false)
    
    useEffect(() => {
        setValores(val)
    }, [])

    const salvar = async () => {
        if(isEditing) {
            let aux = valores;

            valores[index].descricao = descricao;
            valores[index].isAtiva = isAtiva;

            await setValores(aux)
            await setIsEditing(false)
        } else {
            await setValores([...valores,  {
                id: uniqid(),
                descricao,
                isAtiva
            }])
        }

        setDescricao('')
        setIsAtiva(true)
    }

    const editar = async (id) => {
        let index = valores.findIndex(item => item.id === id)

        await setIsEditing(true)
        await setIndex(index)

        await setDescricao(valores[index].descricao)
        await setIsAtiva(valores[index].isAtiva)
    }

    const deletar = async (id) => {
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
                    <Checkbox checked={isAtiva} onChange={() => { setIsAtiva(!isAtiva) }} toggle style={{ marginTop: 5 }} />
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
            keys={['descricao', 'isAtiva']}
            values={valores} 
            actions={actions} 
            isEditing={isEditing}
            index={index}/>
    </div>
}

export default Culturas

