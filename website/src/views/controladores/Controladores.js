import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { Form, Checkbox, Grid, Button } from 'semantic-ui-react'
import uniqid from 'uniqid'

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
    
    useEffect(() => {
        setValores(val)
    }, [])

    const salvar = async () => {
        if(isEditing) {
            let aux = valores;

            aux[index].nome = nome;

            await setValores(aux)
            await setIsEditing(false)
        } else {
            await setValores([...valores,  {
                id: uniqid(),
                nome
            }])
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
        await setValores(valores.filter(item => item.id !== id))
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

    return <div>
        <Grid>
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