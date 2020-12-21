import Fade from 'react-reveal/Fade'
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { useRouter } from 'next/router'

const ProjectBox = ({ description, link, delay, tags, year, image }) => {
  const router = useRouter()
  return (
    <Col md={6}>
      <Card className="post my-4 shadow rounded" onClick={() => router.push(link)}>
        <Card.Img src={image} />
        <Fade delay={delay}>
          <Card.Body>
            <h4>{description}</h4>
          </Card.Body>
        </Fade>
        <Card.Footer>
          <small className="mr-2">{year}</small>
          {tags && tags.map(tag => (
            <Badge pill variant="info" key={tag} className="ml-2">
              {tag}
            </Badge>
          ))}
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default function Projects() {
  return (
    <div className="my-5">
      <h1 className="display-2 m-4">My Projects. 🔨</h1>
      <hr />
      <Row>
        <ProjectBox
          description="Fullstack Nextjs e-commerce project. My most complete project yet. Connects to Stripe and a PostgresQL database to allow for products to be added to cart and checked out. Many different tools involved here. Check it out!"
          link="/projects/7"
          tags={['Nextjs', 'Express', 'Stripe', 'PostgresQL']}
          delay={0}
          year={2020}
          image="/assets/coverImg/market.jpg"
        />
        <ProjectBox
          description="Senior fullstack project to assist with spotting human trafficking and reporting it. This is a social media site to make posts with images and make comments about missing people."
          link="/projects/6"
          tags={['React', 'Express', 'MongoDB', 'AWS S3']}
          delay={0}
          year={2020}
          image="/assets/coverImg/traffick.jpg"
        />
        <ProjectBox
          description="React Dashboard. Sample of a currently used production page created in my intern postion at Ellucian"
          link="/projects/5"
          tags={['React']}
          delay={0}
          year={2020}
          image="/assets/coverImg/ecrm-dashboard.jpg"
        />
        <ProjectBox
          description="Django Social Media site using Bootstrap, Misaka and django-braces. Hosted using Heroku"
          link="/projects/4"
          tags={['Django']}
          delay={600}
          year={2019}
          image="/assets/coverImg/dj-social-cover.jpg"
        />
        <ProjectBox
          description="Django Blog using Bootstrap. Hosted using Heroku"
          link="/projects/3"
          tags={['Django']}
          delay={400}
          year={2019}
          image="/assets/coverImg/dj-blog-cover.jpg"
        />
        <ProjectBox
          description="Mock Tech Support website with JavaScript form validation project"
          link="/projects/2"
          tags={['JavaScript']}
          delay={200}
          year={2018}
          image="/assets/coverImg/tech-cover.jpg"
        />
        <ProjectBox
          description="Mock Photography website"
          link="/projects/1"
          tags={['JavaScript']}
          delay={0}
          year={2015}
          image="/assets/coverImg/photo-cover.jpg"
        />
      </Row>
    </div>
  )
}
