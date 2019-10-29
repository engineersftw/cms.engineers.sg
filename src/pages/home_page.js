import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function HomePage () {
  return (
    <Container className="mt-3">
      <Row>
        <Col sm={12} md={{span: 6, offset: 3}}>
          <h2>Welcome to CMS</h2>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
