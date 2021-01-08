import { parseCookies } from 'nookies'
import query from '../../lib/helper'

export default async function (req, res) {
  try {
    let result
    const cookies = parseCookies({ req })
    if (cookies.admin === 'true') {
      result = await query('SELECT * FROM comment WHERE post_id=$1',
        [req.query[0]]
      )
    } else {
      result = await query("SELECT * FROM comment WHERE post_id=$1 AND status='approved'",
      [req.query[0]]
      )
    }
    const inReview = await query("SELECT * FROM comment WHERE status='review'")
    if (result.err) {
      res.status(400).send(result.err)
    } else {
      // console.log('got admin cookie =', cookies.admin)
      res.status(200).json({ comments: result.rows, inReview: inReview.rows.length})
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Post Comment')
  }
}