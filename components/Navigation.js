import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navigation() {
  const router = useRouter()
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={() => router.push('/blog')}>CodaBool</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link href="/blog">
            <div className={`${router.asPath.includes('/blog') && 'active'} nav-link`}>Blog</div>
          </Link>
          <Link href="/projects">
            <div className={`${router.asPath.includes('/projects') && 'active'} nav-link`}>Projects</div>
          </Link>
          <Link href="/about">
            <div className={`${router.asPath.includes('/about') && 'active'} nav-link`}>About</div>
          </Link>
          <Link href="/contact">
            <div className={`${router.asPath.includes('/contact') && 'active'} nav-link`}>Contact</div>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}