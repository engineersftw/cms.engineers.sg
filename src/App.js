import React from 'react';
import logo from './engineerssg-logo-text.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Navbar, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

function createEvent(evt) {
  evt.preventDefault()
  console.log('Event', evt.target)
}

function App() {
  return (
    <div className="App">
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src={logo} height="40" alt="" />
          </Navbar.Brand>
        </Navbar>
        <Container className="mt-3">
          <Row>
            <Col sm={12} md={{span: 6, offset: 3}}>
              <Form onSubmit={createEvent}>
                <Form.Group controlId="formEventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control size="lg" type="text" placeholder="Name of your event" />
                </Form.Group>

                <Form.Group controlId="formEventLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control as="textarea" rows="2" />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formEventStartDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="date" placeholder="Start date" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formEventStartTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="time" placeholder="Start time" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formEventEndDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="date" placeholder="End date" />
                    <Form.Text className="text-muted">
                      If multi-day event
                    </Form.Text>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formEventEndTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="time" placeholder="End time" />
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formEventWebsite">
                  <Form.Label>Event Website</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        https://
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="formEventDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="5" />
                </Form.Group>

                <Form.Group controlId="formEventGroup">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control type="text" placeholder="Group name" />
                </Form.Group>

                <Form.Group controlId="formEventGroupLink">
                  <Form.Label>Group Website</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon3">
                        https://
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3" />
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit Event
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default App;
