import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { kebabCase } from 'lodash'
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

const TagLink = system({
  is: 'span',
  mx: 1,
})

interface IBlogTemplateProps {
  data: {
    markdownRemark: {
      excerpt: string
      frontmatter: {
        author: string
        date: string
        tags: string[]
        title: string
      }
      html: string
    }
  }
}

class BlogTemplate extends React.Component<IBlogTemplateProps, {}> {
  render() {
    const post = this.props.data.markdownRemark
    const tagLinks = post.frontmatter.tags.map(tag => (
      <TagLink key={`tagLink-${tag}`}>
        <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
      </TagLink>
    ))
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper>
          <Box py={4}>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <div>
              Written by{' '}
              <Link to={`/team/${kebabCase(post.frontmatter.author)}`}>
                {post.frontmatter.author}
              </Link>
              &nbsp;on {post.frontmatter.date}
            </div>
            <div>Tags: {tagLinks}</div>
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        tags
        title
      }
    }
  }
`
