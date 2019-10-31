import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function AuthButton({ auth }) {
  let history = useHistory()
  const [ session, setSession ] = useState(false)

  auth.isLoggedIn().then(result => setSession(result))

  if (session || auth.isAuthenticated) {
    return (
      <Form inline>
        <span className="mr-2">Hi, {auth.userProfile.firstName}</span>{" "}
        <Button variant="outline-success" size="sm" onClick={() => {
          auth.logout(() => history.push("/"))
        }}>Logout</Button>
      </Form>
    )
  }

  return (
    <Form inline>
      <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
    </Form>
  )
}

export default AuthButton
