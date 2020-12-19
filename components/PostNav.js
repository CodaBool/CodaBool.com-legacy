import Pagination from 'react-bootstrap/Pagination'
import Row from 'react-bootstrap/Row'
import { HouseDoorFill } from 'react-bootstrap-icons'
import { useRouter } from 'next/router'

export default function PostNav({ current, total }) {
  const router = useRouter()
  return (
    <Row>
      <Pagination className="mx-auto my-5" size="lg">
        {current > 1 && <Pagination.First onClick={() => {window.scrollTo(0, 0); router.push(`/blog/${current - 1}`)}} />}
        <Pagination.Item onClick={() => {window.scrollTo(0, 0); router.push('/blog')}}><HouseDoorFill size={20}/></Pagination.Item>
        {current < total && <Pagination.Last onClick={() => {window.scrollTo(0, 0); router.push(`/blog/${Number(current) + 1}`)}} />}
      </Pagination>
    </Row>
  )
}
