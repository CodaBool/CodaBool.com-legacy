import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export function getSlugs() {
  return fs.readdirSync(join(process.cwd(), '_posts'))
}

export function getPosts() { // only used for blog index
  const slugs = getSlugs()
  const posts = slugs
    .map((slug) => getPost(slug, true))
    .sort((a, b) => b.slug - a.slug) // had buggy behavior with date so using numbered name instead 
  return posts
}

export function getPost(slug, isSimple) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(join(process.cwd(), '_posts'), `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  if (isSimple) {
    return { slug: realSlug, data }
  } else {
    return { slug: realSlug, data, content }
  }
}