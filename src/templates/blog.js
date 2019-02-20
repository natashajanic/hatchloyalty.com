import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import system from 'system-components'
import Layout from '../components/layout'
import Wrapper from '../components/Wrapper'
import SEO from '../components/seo'

const PostHeader = system({
  is: 'header',
  py: 5
})

const PostTitle = system({
  is: 'h1',
  color: 'offBlack',
  fontSize: 8,
  lineHeight: '1.25',
})

const PostAuthor = system({
  is: 'div',
  color: 'grayDark',
  fontSize: 3,
})

const PostTags = system({
  is: 'div'
})

const PostBody = system({
  is: 'div',
  color: 'grayDark',
})

const TagLink = system({
  is: 'span',
  mx: 1,
})

class BlogTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const tagLinks = post.frontmatter.tags.map(tag =>
      <TagLink key={`tagLink-${tag}`}>
        <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
      </TagLink>
    )
    return (
      <Layout
        pageStyle="white"
      >
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper
          maxWidth="750px"
        >
          <PostHeader>
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <PostAuthor>Written By: {post.frontmatter.author}</PostAuthor>

            {post.frontmatter.featuredImage && <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}

          </PostHeader>

          <PostBody is="div" dangerouslySetInnerHTML={{ __html: post.html }} />

          <PostTags>{tagLinks}</PostTags>
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
        author
        tags
        featuredImage {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`