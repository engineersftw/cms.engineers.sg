import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function AuthButton({ auth }) {
  let history = useHistory()

  return (
    <Form inline>
      {
        auth.isAuthenticated ? (
          <Button variant="outline-success" size="sm" onClick={() => {
            auth.logout(() => history.push("/"))
          }}>Logout</Button>
        ) : (
          <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
        )
      }
    </Form>
  )
}

export default AuthButton
