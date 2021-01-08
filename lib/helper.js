import axios from 'axios'

export default async function Query(q, values) {
  return await axios.get('https://pg-pool.herokuapp.com/home', 
    { params: {key: process.env.POOL_KEY, query: q, arg: values}}
  )
    .then(res => {
      return res.data // TODO: check what the res looks like for other CRUD, only checked with 
    })
    .catch(err => {
      return {err: err.message} // passes to nearest error handler
    })
}