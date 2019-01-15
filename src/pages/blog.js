import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Text from '../components/Text'
import system from 'system-components'
import Panel from '../components/Panel'
import BlogPostContainer from '../components/BlogPostContainer'

const BlogPostCard = system({
  is: Panel,
  px: 4,
  py: 5,
  mb: 4,
})

const BlogPostCardTitle = system({
  is: 'h3',
  color: 'offBlack',
  fontSize: [3,4],
  mb: 2,
})

const BlogPostCardMeta = system({
  is: 'div',
  color: 'grayDark',
  fontSize: 1,
})

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} pageStyle="offWhite">
        <SEO title="All Posts" keywords={['hatch', 'hatch loyalty', 'loyalty', 'blog', 'personalization', 'activation',]} />
        <BlogPostContainer
          is="main"
        >
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <BlogPostCard
                key={node.fields.slug}
              >
                <BlogPostCardTitle>
                  <Link
                    to={node.fields.slug}
                    color="offBlack"
                  >
                    {title}
                  </Link>
                </BlogPostCardTitle>

                <BlogPostCardMeta>
                  Post Written by {node.frontmatter.author} on {node.frontmatter.date}
                </BlogPostCardMeta>

                {node.frontmatter.featuredImage && <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid} />}

                <Text is="p" dangerouslySetInnerHTML={{ __html: node.excerpt }}/>
                <Link
                  to={node.fields.slug}
                  color="grayDark"
                >Read More</Link>
              </BlogPostCard>
            )
          })}
        </BlogPostContainer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            author
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
    }
  }
`