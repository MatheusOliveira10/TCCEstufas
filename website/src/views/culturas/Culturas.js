import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button } from 'semantic-ui-react'
import uniqid from 'uniqid'

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
    const [isAtiva, setIsAtiva] = useState(true)
    
    useEffect(() => {
        setValores(val)
    }, [])

    const adicionar = async () => {
        await setValores([...valores,  {
            id: uniqid(),
            descricao,
            ativa: isAtiva
        }])

        setDescricao('')
        setIsAtiva(true)
    }

    const deletar = async (id) => {
        await setValores(valores.filter(item => item.id !== id))
    }

    const actions = [
        {
            icon: 'pencil',
            color: 'green',
            action: adicionar
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
                    <Checkbox defaultChecked={isAtiva} onClick={() => { setIsAtiva(!isAtiva) }} toggle style={{ marginTop: 5 }} />
                </Form.Field>
            </Form.Group>
            <Button.Group floated='right' style={{ marginBottom: 20 }}>
                <Button color='primary' onClick={adicionar}>
                    Salvar
                </Button>
            </Button.Group>
        </Form>

        <Table
            unstackable
            headers={['Descrição', 'Ativa']}
            keys={['descricao', 'ativa']}
            values={valores} 
            actions={actions} />
    </div>
}

export default Culturas

