import React from 'react'
import { graphql, Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
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

class BlogTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper>
          <Box py={4}>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <span>{post.frontmatter.author}</span>
            <Link to={`/tags/${kebabCase(post.frontmatter.tags)}`}>{post.frontmatter.tags}</Link>
          </Box>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        tags
      }
    }
  }
`