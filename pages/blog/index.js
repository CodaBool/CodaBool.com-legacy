import { getPosts } from '../../lib/api'
import { useState, useEffect } from 'react'
import Post from '../../components/Post'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Fade from 'react-reveal/Fade'

export default function blog({ posts }) {
  const [heroPost, setHeroPost] = useState(posts[0])
  const [morePosts, setMorePosts] = useState(posts.slice(1))
  useEffect(() => {
  }, [])
  let i = 0, j, tempArr, chunk = 2, splitPosts = []
  for (i = 0 , j = morePosts.length; i < j; i += chunk) {
    tempArr = morePosts.slice(i, i + chunk)
    splitPosts.push(tempArr)
  }
  
  return (
    <>
      {heroPost && <Post post={heroPost} isHero />}
      <hr/>
      {morePosts.length > 0 && 
        splitPosts.map(cols => (
          <Row key={cols[0].slug}>
            {cols.map(post => (
              <Col sm={12} md={6} key={post.data.title}>
                <Fade bottom>
                  <Post post={post} />
                </Fade>
              </Col>
            ))}
          </Row>
        ))
      }
    </>
  )
}

export async function getStaticProps() {
  return { props: { posts: getPosts() } }
}