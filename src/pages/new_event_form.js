import React, { useReducer } from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import moment from 'moment'

const initialFormData = {
  name: '',
  location: '',
  start_date: moment().format('YYYY-MM-DD'),
  start_time: moment().format('HH:00'),
  end_date: moment().format('YYYY-MM-DD'),
  end_time: moment().add(2, 'h').format('HH:00'),
  url: 'https://',
  description: '',
  group_name: '',
  group_link: 'https://'
}

function reducer(state, action) {
  if (action.field === 'start_date' && moment(state.end_date) < moment(action.value)) {
    return { ...state, start_date: action.value, end_date: action.value }
  }

  if (action.field === 'end_date' && moment(action.value) < moment(state.start_date)) {
    return { ...state, start_date: action.value, end_date: action.value }
  }

  if (action.field === 'start_time' && moment(action.value, 'HH:mm') > moment(state.end_time, 'HH:mm')) {
    return { ...state, start_time: action.value, end_time: action.value }
  }

  if (action.field === 'end_time' && moment(action.value, 'HH:mm') < moment(state.start_time, 'HH:mm')) {
    return { ...state, start_time: action.value, end_time: action.value }
  }

  return { ...state, [action.field]: action.value }
}

function NewEventForm() {
  const [state, dispatch] = useReducer(reducer, initialFormData)

  function createEvent(evt) {
    evt.preventDefault()
    console.log(state)
  }

  function updateField(evt) {
    dispatch({ field: evt.target.name, value: evt.target.value })
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={12} md={{span: 6, offset: 3}}>
          <Form onSubmit={createEvent}>
            <Form.Group controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control size="lg" name="name" type="text" value={state.name} placeholder="Name of your event" onChange={updateField} />
            </Form.Group>

            <Form.Group controlId="formEventLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" as="textarea" rows="2" value={state.location} onChange={updateField} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formEventStartDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control name="start_date" type="date" placeholder="Start date" value={state.start_date} onChange={updateField} />
              </Form.Group>

              <Form.Group as={Col} controlId="formEventStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control name="start_time" type="time" placeholder="Start time" value={state.start_time} onChange={updateField} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formEventEndDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control name="end_date" type="date" placeholder="End date" value={state.end_date} onChange={updateField} />
                <Form.Text className="text-muted">
                  If multi-day event
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formEventEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control name="end_time" type="time" placeholder="End time" value={state.end_time} onChange={updateField} />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formEventWebsite">
              <Form.Label>Event Website</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    URL
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name="url" type="text" aria-describedby="basic-addon3" value={state.url} onChange={updateField}  />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" rows="5" value={state.description} onChange={updateField} />
            </Form.Group>

            <Form.Group controlId="formEventGroup">
              <Form.Label>Group Name</Form.Label>
              <Form.Control name="group_name" type="text" placeholder="Group name" value={state.group_name} onChange={updateField} />
            </Form.Group>

            <Form.Group controlId="formEventGroupLink">
              <Form.Label>Group Website</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon3">
                    URL
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name="group_link" type="text" aria-describedby="basic-addon3" value={state.group_link} onChange={updateField} />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Event
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewEventForm
