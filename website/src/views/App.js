import React from 'react'
import '../assets/css/customStyles.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Menu, Icon, Container } from 'semantic-ui-react'
import { routes } from '../routes'
import uniqid from 'uniqid'
import { Provider, useDispatch } from "react-redux"
import { ConnectedRouter } from 'connected-react-router'
import store from '../store'

const App = () => {
  return (<Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu color='green' inverted className='top fixed'>
          <Menu.Item header icon>Estufas</Menu.Item>
          {routes.map((item) => {
            if (item.path !== '*') {
              return <Menu.Item as='a' href={item.path} key={uniqid()}>
                <Icon name={item.icon} /> {item.title}
              </Menu.Item>
            }

            return null
          })}
        </Menu>

        <Container style={{ marginTop: '4em' }}>
          <Switch>
            {routes.map(item => <Route path={item.path} exact={item.exact} component={item.component} key={uniqid()} />)}
          </Switch>
        </Container>
      </div>
    </BrowserRouter>
  </Provider>
  )
}

export default App