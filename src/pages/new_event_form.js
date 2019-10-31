import React, { useReducer } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap'
import moment from 'moment'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const ADD_EVENT = gql`
  mutation AddNewEvent($event: EventInput!) {
    createEvent(event: $event) {
      code
      success
      message
      event {
        uid
        name
        url
        start_time
        end_time
        location
        group_name
        group_url
      }
    }
  }
`

const initialFormData = {
  name: '',
  description: '',
  location: '',
  url: 'https://',
  group_name: '',
  group_url: 'https://',
  start_time: moment().minute(0),
  end_time: moment().minute(0).add(2, 'h')
}

function reducer(state, action) {
  if (action.field === 'start_time_date') {
    const newDate = moment(action.value)
    const newStartTime = state.start_time.year(newDate.year()).month(newDate.month()).date(newDate.date())

    if (state.end_time.dayOfYear() < newStartTime.dayOfYear()) {
      const newEndTime = state.end_time.year(newDate.year()).month(newDate.month()).date(newDate.date())
      return { ...state, start_time: newStartTime, end_time: newEndTime }
    }

    return { ...state, start_time: newStartTime }
  }

  if (action.field === 'start_time_time') {
    const newTime = moment(action.value, 'HH:mm')
    const newStartTime = state.start_time.hour(newTime.hour()).minute(newTime.minute())

    if (newStartTime > state.end_time) {
      const newEndTime = state.end_time.hour(newTime.hour()).minute(newTime.minute())
      return { ...state, start_time: newStartTime, end_time: newEndTime }
    }

    return { ...state, start_time: newStartTime }
  }

  if (action.field === 'end_time_date') {
    const newDate = moment(action.value)
    const newEndTime = state.end_time.year(newDate.year()).month(newDate.month()).date(newDate.date())

    if (newEndTime.dayOfYear() < state.start_time.dayOfYear()) {
      const newStartTime = state.start_time.year(newDate.year()).month(newDate.month()).date(newDate.date())
      return { ...state, start_time: newStartTime, end_time: newEndTime }
    }

    return { ...state, end_time: newEndTime }
  }

  if (action.field === 'end_time_time') {
    const newTime = moment(action.value, 'HH:mm')
    const newEndTime = state.end_time.hour(newTime.hour()).minute(newTime.minute())

    if (newEndTime < state.start_time) {
      const newStartTime = state.start_time.hour(newTime.hour()).minute(newTime.minute())
      return { ...state, start_time: newStartTime, end_time: newEndTime }
    }

    return { ...state, end_time: newEndTime }
  }

  return { ...state, [action.field]: action.value }
}

function NewEventForm() {
  const [state, dispatch] = useReducer(reducer, initialFormData)
  const [ addEvent, { called, loading: mutationLoading, error: mutationError, data: mutationData } ] = useMutation(ADD_EVENT)

  function createEvent(evt) {
    evt.preventDefault()
    console.log(state)
    addEvent({ variables: { event: state } })
  }

  function updateField(evt) {
    dispatch({ field: evt.target.name, value: evt.target.value })
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={12} md={{span: 6, offset: 3}}>
          {mutationError && <Alert variant="danger" dismissible>{mutationError.message}</Alert>}
          {called && !mutationLoading && !mutationError && <Alert variant="success" dismissible>{mutationData.createEvent.message}</Alert>}

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
                <Form.Control name="start_time_date" type="date" placeholder="YYYY-MM-DD" value={state.start_time.format('YYYY-MM-DD')} onChange={updateField} />
              </Form.Group>

              <Form.Group as={Col} controlId="formEventStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control name="start_time_time" type="time" placeholder="HH:MM" value={state.start_time.format('HH:mm')} onChange={updateField} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formEventEndDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control name="end_time_date" type="date" placeholder="YYYY-MM-DD" value={state.end_time.format('YYYY-MM-DD')} onChange={updateField} />
                <Form.Text className="text-muted">
                  If multi-day event
                </Form.Text>
              </Form.Group>

              <Form.Group as={Col} controlId="formEventEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control name="end_time_time" type="time" placeholder="HH:MM" value={state.end_time.format('HH:mm')} onChange={updateField} />
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
                <Form.Control name="group_url" type="text" aria-describedby="basic-addon3" value={state.group_url} onChange={updateField} />
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
