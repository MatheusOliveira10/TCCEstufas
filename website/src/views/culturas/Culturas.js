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
    
    useEffect(() => {
        setValores(val)
    }, [])

    const adicionar = async () => {
        await setValores([...valores,  {
            id: uniqid(),
            descricao,
            isAtiva
        }])

        setDescricao('')
        setIsAtiva(true)
    }

    const editar = async (id) => {
        let registro = valores.find(item => item.id === id)

        await setDescricao(registro.descricao)
        await setIsAtiva(registro.isAtiva)
    }

    const deletar = async (id) => {
        await setValores(valores.filter(item => item.id !== id))
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
                <Button primary onClick={adicionar}>
                    Salvar
                </Button>
            </Button.Group>
        </Form>

        <Table
            unstackable
            headers={['Descrição', 'Ativa?']}
            keys={['descricao', 'isAtiva']}
            values={valores} 
            actions={actions} />
    </div>
}

export default Culturas

