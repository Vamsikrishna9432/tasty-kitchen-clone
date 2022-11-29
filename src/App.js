import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import RestaurentDetails from './components/RestaurentDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <ProtectedRoute
          exact
          path="/restaurant/:id"
          component={RestaurentDetails}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}

export default App
