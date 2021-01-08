import { setCookie } from 'nookies'
import query from '../../lib/helper'

export default async function (req, res) {
  try {
    const { password } = req.body
    const result = await query("SELECT * FROM admin WHERE email='codabool@pm.me'")
    console.log('login req result', result.rows)
    console.log('compare', result.rows, 'vs', password)
    if (password === result.rows[0].password) {
      setCookie({ res }, 'admin', 'true', {
        maxAge: 12 * 30 * 24 * 60 * 60, // 1 year
        path: '/',
        sameSite: true,
        httpOnly: true
      })
      setCookie({ res }, 'controls', 'true', {
        maxAge: 12 * 30 * 24 * 60 * 60, // 1 year
        path: '/',
        sameSite: true
      })
      res.status(200).send('success')
    } else {
      res.status(400).send(result.err)
    }
  } catch (err) {
    res.status(400).send('General Error Cannot Login')
  }
}