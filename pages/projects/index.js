import Fade from "react-reveal/Fade"
import Badge from 'react-bootstrap/Badge'

const ProjectBox = ({ title, description, link, delay, tags }) => (
  <div className="m-5">
    <a href={link}><h1>🔗 {title}</h1></a>
    <Fade bottom delay={delay}>
      <>
        <h2>{description}</h2>
        {tags && tags.map(tag => (
          <Badge pill variant="info" key={tag} className="mr-2">
            {tag}
          </Badge>
        ))}
      </>
    </Fade>
  </div>
)

// TODO: would be nice to have an image for each project
export default function Projects() {
  return (
    <div className="my-5">
      <h1 className="display-2 m-4">My Projects. 🔨</h1>
      <hr />
      <ProjectBox
        title="Project 1"
        description="Mock Photography website"
        link="/projects/1"
        tags={['JavaScript']}
        delay={0}
      />
      <ProjectBox
        title="Project 2"
        description="Mock Tech Support website with JavaScript form validation project"
        link="/projects/2"
        tags={['JavaScript']}
        delay={400}
      />
      <ProjectBox
        title="Project 3"
        description="Django Blog using Bootstrap. Hosted using Heroku"
        link="/projects/3"
        tags={['Django']}
        delay={800}
      />
      <ProjectBox
        title="Project 4"
        description="Django Social Media site using Bootstrap, Misaka and django-braces. Hosted using Heroku"
        link="/projects/4"
        tags={['Django']}
        delay={1200}
      />
      <ProjectBox
        title="Project 5"
        description="React Dashboard. Sample of a currently used production page created in my intern postion at Ellucian"
        link="/projects/5"
        tags={['React']}
        delay={1600}
      />
    </div>
  )
}
