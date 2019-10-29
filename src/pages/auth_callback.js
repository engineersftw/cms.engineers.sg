import React, { useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

function AuthCallback(props) {
  let location = useLocation()
  let history = useHistory()

  useEffect(
    () => {
      const queryComponents = queryString.parse(location.search)

      props.auth.exchangeAuthToken(queryComponents.code, queryComponents.state)
        .then((result) => {
          history.replace(result.returnUrl)
        })
        .catch((error) => {
          console.error(error.message)
          history.replace('/')
        })
    }
  )

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={12} md={{span: 6, offset: 3}}>
          <h3>Redirecting you soon...</h3>
          <Spinner animation="border" size="sm" role="status" variant="info">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthCallback
