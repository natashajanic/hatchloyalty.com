import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['hatch', 'hatch loyalty', 'loyalty', 'personalization', 'activation']} />
    <h1>Goodbye, traditional loyalty. Hello, Hatch.</h1>
    <h2>Technology designed to help you build stronger, more personal relationships with your customers.</h2>
  </Layout>
)

export default IndexPage
