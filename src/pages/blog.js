import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { BookOpen } from 'react-feather'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Text from '../components/Text'
import Box from '../components/Box'
import system from 'system-components'
import Panel from '../components/Panel'
import BlogPostContainer from '../components/BlogPostContainer'
import IconCircle from '../components/IconCircle'

const BlogPostCard = system({
  is: Panel,
  px: 4,
  py: 5,
  mb: 4,
})

// const BlogPostCardTitle = system({
//   is: 'h3',
//   color: 'offBlack',
//   fontSize: [3,4],
//   mb: 2,
// })

const BlogPostCardMeta = system({
  is: 'div',
  color: 'grayDark',
  fontSize: 1,
})

const BlogPostTag = system({
  is: 'span',
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
          <Box display="flex" alignItems="center">
            <IconCircle bg="green">
              <BookOpen size={20} color="#fff" />
            </IconCircle>
            <Text fontSize={1} ml={2}>Hatch Insights</Text>
          </Box>

          <Text is="h2" fontSize={5}>Learn from experts. Hatch is here to help you build stronger relationships with your customers.</Text>

          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <BlogPostCard
                key={node.fields.slug}
              >
                <BlogPostTag>{node.frontmatter.tags}</BlogPostTag>

                <Link
                  to={node.fields.slug}
                  style={{
                    color: '#666666',
                    display: 'block',
                    textDecoration: 'none'
                  }}
                >
                  {title}
                </Link>

                <BlogPostCardMeta>
                  Post Written by {node.frontmatter.author} on {node.frontmatter.date}
                </BlogPostCardMeta>

                {node.frontmatter.featuredImage && <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid} />}

                <Text
                  is="p"
                  color="grayDark"
                  fontSize={3}
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                />

                <Link
                  to={node.fields.slug}
                  color="grayDark"
                >
                  Read More
                </Link>
              </BlogPostCard>
            )
          })}
        </BlogPostContainer>
      </Layout>
    )
  }
}

export default BlogIndex

export const blogIndexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "blog"}}},
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
    }
  }
`
