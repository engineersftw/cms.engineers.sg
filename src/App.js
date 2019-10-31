import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks'

import logo from './engineerssg-logo-text.svg';
import PrivateRoute from './helpers/private_route'
import AuthButton from './helpers/auth_button'

import HomePage from './pages/home_page'
import LoginPage from './pages/login_page'
import NewEventForm from './pages/new_event_form'
import AuthCallback from './pages/auth_callback'

import Auth from './services/auth'
import Events from './services/events'

const authService = new Auth()
const events = new Events()

function App() {
  return (
    <Router>
      <div className="App">
        <Container>
          <Navbar bg="light" expand="lg">
            <Link to="/" className="navbar-brand">
              <img src={logo} height="40" alt="" />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/events/new" className="nav-link">New Event</Link>
              </Nav>
              <AuthButton auth={authService} />
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage auth={authService} />
            </Route>
            <Route exact path="/auth/callback">
              <AuthCallback auth={authService} />
            </Route>
            <PrivateRoute auth={authService} path="/events/new">
              <ApolloProvider client={events.client}>
                <NewEventForm />
              </ApolloProvider>
            </PrivateRoute>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
