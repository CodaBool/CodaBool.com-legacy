import { useEffect } from 'react'
import { format } from 'timeago.js'
import mdCSS from '../../styles/markdown.module.css'
import Prism from '../../lib/prism'
import PostNav from '../../components/PostNav'

// serverside
import remark from 'remark'
import html from 'remark-html'
import { getPost, getSlugs } from '../../lib/api'
import Comments from '../../components/Comments'
import axios from 'axios'

export default function BlogSlug({ post, total }) {
  useEffect(() => Prism.highlightAll(), [])
  useEffect(() => {
    axios.put('/api/putPost', {post_id: post.slug})
      // .then(res => console.log('updated post view count to', res.data))
      // .catch(err => console.log(err.response))
  }, [post.slug])

  return (
    <>
      <h1 className="display-3 mt-3">{post.data.title}</h1>
      <h4 className="text-muted">{format(post.data.date)}</h4>
      <img
        src={post.data.coverImage}
        alt="Cover Image"
        className="w-100"
        // width={20}
        // height={20}
      />
      <div className="d-flex mt-3">
        <img 
          src={post.data.author.picture} 
          alt={post.data.author.name}
          className="rounded-circle"
        />
        <div className="ml-5 mt-4">
          <h2>{post.data.author.name}</h2>
        </div>
      </div>
      <div
        className={mdCSS.markdown} 
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <PostNav total={total} current={post.slug} />
      <Comments post_id={post.slug}/>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPost(params.slug, false)
  const result = await remark().use(html).process(post.content || '')
  const content = result.toString()
  const total = getSlugs().length
  return {
    props: {
      post: {
        ...post,
        content,
      },
      total
    },
  }
}

export async function getStaticPaths() {
  const slugs = getSlugs()
  const posts = slugs.map(slug => getPost(slug, true))
  const paths = posts.map(page => ({
    params: {slug: page.slug},
  }))
  // console.log('path', paths)
  return { paths, fallback: false } // false means unspecified routes result in 404
}