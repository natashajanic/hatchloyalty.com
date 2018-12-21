import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <h1>Goodbye, traditional loyalty. Hello, Hatch. Technology designed to help you build stronger, more personal relationships with your customers.</h1>
    <Link to="/blog/">View Blog</Link>
  </Layout>
)

export default IndexPage
