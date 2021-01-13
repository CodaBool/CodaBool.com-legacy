import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Row from 'react-bootstrap/Row'
import { redirectSpinner } from '../../components/landingPage/Type'
import TerminalAnimation from 'react-animated-term'

const PROJECT_COUNT = 8 // used for static render of pages at build time (getStaticPaths)

export default function Project({ slug }) {
  const router = useRouter()
  useEffect(() => {
    switch(slug) {
      case '1': router.push('https://codabool-js-photography.herokuapp.com'); break
      case '2': router.push('https://codabool-js-techsupport.herokuapp.com'); break
      case '3': router.push('https://codabool-django-blog.herokuapp.com'); break
      case '4': router.push('https://codabool-django-social.herokuapp.com'); break
      case '5': router.push('https://codabool-react-dashboard.herokuapp.com'); break
      case '6': router.push('https://codabool-nextjs-social.herokuapp.com'); break
      case '7': router.push('https://market.codabool.vercel.app'); break
      case '8': router.push('https://codabool-react-search.herokuapp.com'); break
      default: router.push('/projects')
    }
  }, [])

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

export async function getStaticProps(context) {
  const { slug } = context.params
  return { props: { slug } }
}

export async function getStaticPaths() {
  const arr = []
  let paths = []
  for (let i = 1; i < PROJECT_COUNT + 1; i++){
    arr.push(String(i))
  }
  paths = arr.map(page => ({
    params: { slug: page },
  }))
  console.log('projects/[slug] paths', paths)
  return { paths, fallback: false } // false means unspecified routes result in 404
}