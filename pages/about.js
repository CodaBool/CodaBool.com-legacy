import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Fade from 'react-reveal/Fade'
import { useRef, useState } from 'react'
import axios from 'axios'

let count = 0

export default function About() {
  const [show, setShow] = useState(false);
  const password = useRef(null)

  function adminCheck() {
    count++
    if (count > 5) {
      setShow(true)
      setTimeout(() => {
        if (password) {
          if (password.current) {
            password.current.value = ''
            password.current.focus()
          }
        }
      }, 500)
    }
  }
  function login() {
    axios.post('/api/login', { password: password.current.value })
      .then(res => alert('Successfully logged in!'))
      .catch(err => console.log(err.response.data))
  }

  function checkEnter(e) {
    if (e.keyCode === 13) {
      login()
      setShow(false)
    }
  }

  return (
    <div className="my-5">
      <Row>
        <Col lg={6} className="mt-4">
          <img
            onClick={adminCheck}
            src="/assets/authorImg/codabool-lg.jpg"
            alt="me"
            className="shadow rounded-circle"
            width={300}
            height={300}
          />
        </Col>
        <Col lg={6} className="mb-4">
          <Fade bottom>
            <h1 className="display-4 m-2">Hello, <div className="sway d-inline-block">👋</div></h1>
          </Fade>
          <Fade delay={1000}>
            <h3 className="m-1">&emsp;I'm newly graduated, an active developer and a devops intern. I work for a company called Ellucian which offers IT solutions for higher education. Please feel free to look around at my projects, blog or reach out to me. Thanks for visiting. </h3>
          </Fade>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col lg={6} className="mb-4">
          <Fade bottom delay={2000}>
            <h1 className="display-4 m-2">About me. 💻</h1>
          </Fade>
          <Fade delay={3000}>
            <h3 className="m-1">&emsp;I graduated December of 2020. My Bachelors is in Computing Technology and Software Development. I am a fullstack web developer. I'm currently working for an internship in devops using AWS with Jenkins and Ansible.</h3>
          </Fade>
        </Col>
        <Col lg={6}>
          <img
            src="/assets/images/gamejam-group.jpg"
            alt="group"
            className="shadow rounded w-100"
          />
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control placeholder="password" onKeyDown={checkEnter} type="password" ref={password} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={login}>Login</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}