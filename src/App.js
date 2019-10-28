import React from 'react';
import logo from './engineerssg-logo-text.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import NewEventForm from './pages/new_event_form'
import { Container, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} height="40" alt="" />
          </Navbar.Brand>
        </Navbar>
        <NewEventForm />
      </Container>
    </div>
  );
}

export default App;
