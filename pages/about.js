import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from 'react-reveal/Fade'
// import Image from 'next/image'

export default function About() {
  return (
    <div className="my-5">
      <Row>
        <Col lg={6} className="mt-4">
          <img
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
            <h3 className="m-1">&emsp;I just December of 2020. My Bachelors is in Computing Technology and Software Development. I am a fullstack web developer. For my internship I am learning devops configuring AWS with Jenkins and Ansible. </h3>
          </Fade>
        </Col>
        <Col lg={6}>
          <img
            src="/assets/images/gamejam-group.jpg"
            alt="group"
            className="shadow rounded"
            width={450}
            height={300}
          />
        </Col>
      </Row>
    </div>
  )
}