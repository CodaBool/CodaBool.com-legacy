import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { redirectSpinner } from '../../components/landingPage/Type'
import TerminalAnimation from 'react-animated-term'

const PROJECT_COUNT = 10 // used for static render of pages at build time (getStaticPaths)

export default function Project({ slug }) {
  const [error, setError] = useState()
  const router = useRouter()

  useEffect(() => {
    switch(router.query.id) {
      case 'django-1': router.push('https://codabool-django-blog.herokuapp.com'); break
      case 'django-2': router.push('https://codabool-django-social.herokuapp.com'); break
      case '8': router.push('https://p08-type-racer.herokuapp.com'); break
      default: setError(true)
    }
  }, [router])

  if (error) {
    return (
      <Row className="m-0 p-0 mt-5">
        <div className="mx-auto mt-5">
          <h1 className="p-5 mt-5" style={{maxWidth: '40rem'}}>🗺️ Project Missing 🤔</h1>
          <Button className="w-100 ml-4" style={{maxWidth: '28rem'}} variant="outline-secondary" onClick={() => router.push('/projects')}>Return</Button>
        </div>
      </Row>
    )
  }

  return (
    <>
      <Row className="mt-5">
        <div className="mx-auto mt-5">
          <h5 className="mt-5">
            Redirecting 
            <span className="fade1"> . </span>
            <span className="fade2"> . </span>
            <span className="fade3"> . </span>
          </h5>
          <TerminalAnimation
            lines={redirectSpinner}
            interval={5}
          />
        </div>
      </Row>
    </>
  )
}