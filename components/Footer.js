import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="my-3">
      <Container>
        <Row>
          <Col sm={4} className="mt-3 mx-auto">
              {/* About */}
              <hr />
              <p className="text-muted text-center">
                DevOps Engineer and Full-stack Dev. I run this as a personal blog and hub for my projects. If you are interested in contacting me my business email is:
              </p>
              <p className="text-center"><a href="mailto:codabool@pm.me">CodaBool@pm.me</a></p>
          </Col>
          {/* <Col sm={4} className="mt-3">
              Blogs by Tag
              <hr />
              <div>
                <a href="/blog/?filter=webdev"><button className="btn btn-primary m-1">WebDev</button></a>
                <a href="/blog/?filter=devops"><button className="btn btn-primary m-1">DevOps</button></a>
                <a href="/blog/?filter=django"><button className="btn btn-primary m-1">Django</button></a>
                <a href="/blog/?filter=personal"><button className="btn btn-primary m-1">Personal</button></a>
                <a href="/blog/?filter=react"><button className="btn btn-primary m-1">React</button></a>
              </div>
          </Col>
          <Col sm={4} className="mt-3">
            <div>Twitter Placeholder</div>
          </Col> */}
        </Row>
        <Row>
          <div className="text-muted">
            <hr/>
          </div>
        </Row>
        <Row className="ml-2">
          <div className="mx-auto">
            <a href="https://github.com/codabool" className="mr-3">
              {/* get an error about server style when trying to use next/image here */}
              <img
                src="/assets/logos/git-logo.jpg"
                alt="github"
                className="rounded-circle"
                width={60}
                height={60}
                />
            </a>
            <a href="https://twitter.com/coda_bool" className="mr-3">
              {/* get an error about server style when trying to use next/image here */}
              <img
                src="/assets/logos/twitter-logo.jpg"
                alt="twitter"
                className="rounded-circle"
                width={60}
                height={60}
              />
            </a>
          </div>
        </Row>
      </Container>
    </footer>
  )
}
