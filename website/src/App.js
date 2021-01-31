import React, { useState } from 'react'
import { Checkbox, Container, Divider, Grid, Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import './customStyles.css'

const App = () => {
  const [visible, setVisible] = useState(true)

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
        width='thin'
      >
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
            {/* Heads up! Grid.Row is not mandatory, Grid.Column is enough for grid to work */}
            <Grid.Row columns='equal'>
              <Grid.Column>
                <p />
              </Grid.Column>
              <Grid.Column>
                <p />
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default App