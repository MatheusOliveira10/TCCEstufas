import React from 'react'
import { Header, Divider, Grid, Icon } from 'semantic-ui-react'
import LineChart from '../components/LineChart'
import { colors } from '../customStyles'

const Home = () => {
    const data = [
        { time: 0, value: 8 },
        { time: 1, value: 5 },
        { time: 2, value: 4 },
        { time: 3, value: 9 },
        { time: 4, value: 1 },
        { time: 5, value: 7 },
        { time: 6, value: 6 },
        { time: 7, value: 3 },
        { time: 8, value: 4 },
        { time: 9, value: 3 }
    ];

    return (<>
        <Header style={{ marginTop: 20, color: colors.green }} as='h2' icon textAlign='center'>
            <Icon name='info' />
                Monitoramento da Estufa
        </Header>

        <Divider />

        <Grid stackable>
            <Grid.Row columns='equal'>
                <Grid.Column style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                    <LineChart
                        data={data}
                        title={'Teste'}
                        color="#3E517A"
                    />
                </Grid.Column>
                <Grid.Column style={{ alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 20, marginLeft: 10 }}>
                    <LineChart
                        data={data}
                        title={'Teste2'}
                        color="#000"
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>)
}

export default Home

