import React from 'react'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'
import BlogPostContainer from '../components/BlogPostContainer'
import Layout from '../components/layout'
import Box from '../components/Box'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    console.log(post.frontmatter.featuredImage)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <BlogPostContainer>
          <h1>{post.frontmatter.title}</h1>
          <p>
            {post.frontmatter.date}
          </p>

          <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr/>
          <ul>
            <li>
              {
                previous &&
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              }
            </li>
            <li>
              {
                next &&
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              }
            </li>
          </ul>

          <Box>
            Enjoyed this post? Sign up to receive the next one in your inbox. Don't worry, we won't spam you, promise!
            <div>
              <input type="text"/>
            </div>

          </Box>
        </BlogPostContainer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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