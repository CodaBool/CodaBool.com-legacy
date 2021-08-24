export default async (req, res) => {
  try {
    const { method, body, query } = req
    if (method === 'POST') {
    } else if (method === 'GET') {
      res.status(200).json(user)
    } else if (method === 'PUT') {
    } else {
      throw `Cannot use ${method} method for this route`
    }
  } catch (err) {
    if (typeof err === 'string') {
      res.status(400).json({ msg: '/stat: ' + err })
    } else {
      res.status(500).json({ msg: '/stat: ' + (err.message || err)})
    }
  }
}