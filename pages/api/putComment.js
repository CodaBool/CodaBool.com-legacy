import query from '../../lib/helper'
import { parseCookies } from 'nookies'

export default async function (req, res) {
  try {
    let result
    const cookies = parseCookies({ req })
    if (cookies.admin === 'true') {
      result = await query('UPDATE comment SET status=$1 WHERE comment_id=$2 RETURNING *',
        [req.body.status, req.body.comment_id]
      )
      if (result.err) {
        res.status(400).send('Server error doing DB UPDATE')
      } else {
        res.status(200).json(result.rows[0])
      }
    } else {
      res.status(403).send('Not an admin')
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Update Comment')
  }
}