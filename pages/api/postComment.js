import query from '../../lib/helper'
import { parseCookies } from 'nookies'

export default async function (req, res) {
  try {
    const { post_id, alias, content } = req.body
    let admin = false
    let status = 'review'
    const cookies = parseCookies({ req })
    if (cookies.admin === 'true') {
      admin = true
      status = 'approved'
    }
    const result = await query(
      'INSERT INTO comment(post_id, alias, content, admin, status) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
      [post_id, alias, content, admin, status]
    )
    if (result.err) {
      res.status(400).send(result.err)
    } else {
      res.status(200).json(result.rows[0])
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Post Comment')
  }
}