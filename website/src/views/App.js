import React from 'react'
import '../customStyles.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Menu, Icon, Container } from 'semantic-ui-react'
import { routes } from '../routes'
import uniqid from 'uniqid'

const App = () => {
  return (<div>
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
      <BrowserRouter>
        <Switch>
          {routes.map(item => <Route path={item.path} exact={item.exact} component={item.component} key={uniqid()}/>)}
        </Switch>
      </BrowserRouter>
    </Container>
  </div>)
}

export default App