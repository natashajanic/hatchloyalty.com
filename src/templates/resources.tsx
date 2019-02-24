import * as React from 'react'
import { graphql } from 'gatsby'
import system from 'system-components'
import Layout from '../components/layout'
import Box from '../components/box'
import Wrapper from '../components/wrapper'
import SEO from '../components/seo'

const PostTitle = system({
  is: 'h1',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  fontSize: 5,
  m: 0,
  pb: 4,
})

interface IResourceTemplateProps {
  data: {
    markdownRemark: {
      excerpt: string
      frontmatter: {
        title: string
      }
      html: string
    }
  }
}

class ResourceTemplate extends React.Component<IResourceTemplateProps, {}> {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper>
          <Box py={4}>
            <PostTitle>{post.frontmatter.title}</PostTitle>
          </Box>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Wrapper>
      </Layout>
    )
  }
}

export default ResourceTemplate

export const pageQuery = graphql`
  query ResourceBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`
