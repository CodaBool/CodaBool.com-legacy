import { format } from 'timeago.js'
import { useRouter } from 'next/router'

export default function NewPost({ post, isHero }) {
  const router = useRouter()
  return (
    <div 
      onClick={() => {
        window.scrollTo(0, 0)
        router.push(`/blog/${post.slug}`)
      }}
      style={{cursor: 'pointer'}}
      className="m-4"
    >
      <img
        src={post.data.coverImage}
        alt="Cover Image"
        className={`${isHero ? 'hero' : 'non-hero'} my-2 w-100 rounded shadow`}
      />
      <h3>{post.data.title}</h3>
      <div className="text-muted">{format(post.data.date)}</div>
      <h5 className="m-1" style={{
        backgroundColor: 'rgba(211, 211, 211, 0.1)',
        boxShadow: '0px 0px 9px 9px rgba(211, 211, 211, 0.1)'
      }}>{post.data.excerpt}</h5>
    </div>
  )
}
