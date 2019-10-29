import React from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import {
  useLocation
} from "react-router-dom"

function LoginPage (props) {
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }

  const loginUrl = props.auth.loginUrl(from)

  setTimeout(() => {
    document.location.href = loginUrl
  }, 1000)

  return (
    <Container className="mt-3">
      <Row>
        <Col sm={12} md={{span: 6, offset: 3}}>
          <h3>You will need to login to continue...</h3>

          <Button variant="outline-info" href={loginUrl}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {" "}Loading...
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
