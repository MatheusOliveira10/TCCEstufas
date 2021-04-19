import React, { useState } from 'react'
import '../customStyles.css'
import Home from '../views/Home'
import Erro404 from '../views/Erro404'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Sidebar, Menu, Icon, Container } from 'semantic-ui-react'
import customStyles from '../customStyles'

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
        width='thin'>
        <Menu.Item as='a' href="/">
          <Icon name='home' />
              Home
          </Menu.Item>
        <Menu.Item as='a' href="/cs">
          <Icon name='gamepad' />
            Games
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher style={{ width: '100vw', height: '100vh', backgroundColor: customStyles.colors.isabelline }}>
        <Icon style={{ color: customStyles.colors.green }} onClick={() => { setVisible(true) }} name='content' size='large' style={{ padding: 15 }} />

        <Container>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="*" component={Erro404} />
            </Switch>
          </BrowserRouter>
        </Container>

      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default App