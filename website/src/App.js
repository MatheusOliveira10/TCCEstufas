import React, { useState } from 'react'
import { Checkbox, Container, Divider, Grid, Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries } from 'react-vis'
import './customStyles.css'
import LineChart from './components/LineChart'

const App = () => {
  const [visible, setVisible] = useState(true)

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

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'>
        <Menu.Item as='a'>
          <Icon name='home' />
              Home
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
              Games
            </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
              Channels
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher style={{ width: '100vw', height: '100vh' }}>
        <Container>
          <Header style={{ marginTop: 20 }} as='h2' icon inverted textAlign='center'>
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

        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default App