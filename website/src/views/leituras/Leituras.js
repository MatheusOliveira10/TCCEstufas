import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button } from 'semantic-ui-react'

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


const Leituras = () => {
    const [valores, setValores] = useState([])
    
    useEffect(() => {
        setValores(val)
    }, [])

    const actions = [
        {
            icon: 'pencil',
            color: 'green',
            action: () => { setValores([...valores, {
                id: 3,
                descricao: 'Estufa 3',
                ativa: true
            }]) }
        },
        {
            icon: 'times',
            color: 'red',
            action: () => { alert('deletar') }
        }
    ]

    return <div>
        <Grid>
            <Grid.Column floated='left' width={5}>
                <h1>Leituras</h1>
            </Grid.Column>
        </Grid>

        <Form style={{ marginTop: 20 }}>
            <Form.Group widths='equal'>
                <Form.Input label='Descrição' placeholder='Descrição' />
                <Form.Field>
                    <label>Está Ativa?</label>
                    <Checkbox toggle style={{ marginTop: 5 }} />
                </Form.Field>
            </Form.Group>
            <Button.Group floated='right' style={{ marginBottom: 20 }}>
                <Button primary>
                    Salvar
                </Button>
            </Button.Group>
        </Form>

        <Table
            headers={['ID', 'Descrição', 'Ativa']}
            keys={['id', 'descricao', 'ativa']}
            values={valores} 
            actions={actions} />
    </div>
}

export default Leituras

