import React, { useState, useEffect, useCallback, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import { format } from 'timeago.js'
import { debounce, genHexFromString } from '../constants'
import Toast from './Toast'
import { parseCookies, setCookie } from 'nookies'
import { Check2, X } from 'react-bootstrap-icons'
import axios from 'axios'

export default function Comments({ post_id }) {
  const aliasRef = useRef(null)
  const contentRef = useRef(null)
  const hiddenRef = useRef(null)
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [aliasError, setAliasError] = useState(false)
  const [limit, setLimit] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [controls, setControls] = useState(false)
  const [comments, setComments] = useState([])
  const [inReview, setInReview] = useState(null)

  useEffect(() => getComments(), [post_id])

  function getComments() {
    axios.get('/api/getComments', {params: post_id})
      .then(res => {
        setComments(res.data.comments)
        if (res.data.inReview > 0) {
          setInReview(res.data.inReview)
        }
        const cookies = parseCookies()
        if (cookies) {
          if (cookies['controls']) {
            setControls(true)
          }
        }
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }
  function putStatus(comment_id, status) {
    axios.put('/api/putComment', {comment_id, status})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  function addComment() {
    let valid = true
    if (aliasRef.current.value.length > 29 || !aliasRef.current.value.length) {
      setAliasError(true)
      valid = false
    }
    if (contentRef.current.value.length > 2999 || !contentRef.current.value.length) {
      setContentError(true)
      valid = false
    }
    if (hiddenRef.current.value.length) {
      valid = false
    }

    if (valid) {
      const cookies = parseCookies()
      if (cookies) {
        if (cookies['comment-limit']) { // rate limit the comment 
          setLimit(true)
          setErrorToast(true)
          setTimeout(() => setLimit(false), 15000)
        } else {
          setCookie(null, 'comment-limit', 'limit', { maxAge: 5 * 60 }) // 5 * 60 = 5 minutes
          axios.post('/api/postComment', 
            { post_id, alias: aliasRef.current.value, content: contentRef.current.value }
          )
            .then(res => {
              setSuccessToast(true)
              getComments()
            })
            .catch(err => {
              console.log(err.response.data)
            })
        }
      }
    }
  }

  // performant validation check
  const handleContent = useCallback(
		debounce(e => {
      if (e.target.id === 'c-alias') {
        if (e.target.value.length > 29) {
          setAliasError(true)
        } else {
          setAliasError(false)
        }
      } else if (e.target.id === 'c-content') {
        if (e.target.value.length > 2999) {
          setContentError(true)
        } else {
          setContentError(false)
        }
      }
    }, 1000), [] // will be created only once initially
  )

  return (
    <>
      <Accordion className="" defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Comments
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0" className="expandable p-2">
            <>
              {comments.length > 0 
                ? 
                  comments.map(comment => (
                    <div key={comment.comment_id}>
                      <Row className="my-4">
                        <Col md={1}>
                          <div style={{width: '60px'}}>
                            <img 
                              src={`https://ui-avatars.com/api/?length=1&background=${genHexFromString(comment.alias)}&name=${comment.alias}`} 
                              className="rounded-circle"
                            /> 
                          </div>
                        </Col>
                        <Col md={10} className="ml-1">
                          <Card>
                            {comment.admin && <Card.Header>CodaBool</Card.Header>}
                            <Card.Body>
                              {!comment.admin && <Card.Title>{comment.alias}</Card.Title>}
                              {controls && 
                                <p className={`
                                  ${comment.status == 'review' && 'text-warning'} 
                                  ${comment.status == 'approved' && 'text-info'}
                                  ${comment.status == 'archived' && 'text-danger'}
                                `}>
                                  {comment.status}
                                </p>
                              }
                              {comment.content}
                            </Card.Body>
                            <Card.Footer className="text-muted">
                              Created: {format(comment.created)} | Updated: {format(comment.updated)}
                              {controls && 
                                <span className="mx-5">
                                  {/* <span className="mr-3"></span> */}
                                  <Button onClick={() => putStatus(comment.comment_id, 'approved')}><Check2 size={24}/></Button>
                                  <Button variant="danger" onClick={() => putStatus(comment.comment_id, 'archived')}><X size={24}/></Button>
                                </span>
                              }
                              </Card.Footer>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  ))
                :
                  <h4 className="text-center my-5">No Comments</h4>
                }
              {inReview > 0 && <p className="text-muted text-center">{inReview} comments in review</p>}
              <Form className="my-5 p-3">
                <Form.Label>Alias</Form.Label>
                <Form.Control type="text" ref={aliasRef} id="c-alias" onChange={handleContent} placeholder="Alias" />
                <Form.Label className="mt-4">Comment</Form.Label>
                <Form.Control as="textarea" ref={contentRef} className="mb-2" rows={3} id="c-content" onChange={handleContent} placeholder="Enter your comment here" />
                <input ref={hiddenRef} type="hidden" />
                {aliasError && <p className="text-center text-danger mx-auto">Please include an alias under 30 characters</p>}
                {contentError && <p className="text-center text-danger mx-auto">Please include a comment under 3000 characters</p>}
                {limit && <p className="text-center text-danger mx-auto">Please allow some time between posting comments</p>}
                <Row>
                  <Button className="mx-auto mt-4" style={{width: '97%'}} disabled={aliasError || contentError} onClick={addComment}>Add Comment</Button>
                </Row>
              </Form>
            </>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <div style={{position: 'fixed', top: '80px', right: '10px'}}>
        <Toast show={successToast} setShow={setSuccessToast} title='Comment Added' body={<>
          <p><strong>Thank You!</strong></p>
          <p>Your comment was successfully added.</p>
          <p>The admin will review your comment and hopefully aprove it for public viewing.</p>
        </>} />
        <Toast show={errorToast} setShow={setErrorToast} title='Cannot Add Comment' error body={<>
          <p className="text-danger"><strong>Something went wrong</strong></p>
          <p>Unfortunately we could not add this comment</p>
        </>} />
      </div>
    </>
  )
}