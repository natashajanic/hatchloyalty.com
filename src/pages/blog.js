import React from 'react'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { BookOpen } from 'react-feather'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Text from '../components/Text'
import Box from '../components/Box'
import BlogPostContainer from '../components/BlogPostContainer'
import BlogPostPreview from '../components/BlogPostPreview';
import IconCircle from '../components/IconCircle'

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

          {posts.map(({ node }) => (
            <BlogPostPreview
              key={kebabCase(node.fields.slug)}
              author={node.frontmatter.author}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
              featuredImage={node.frontmatter.featuredImage}
              slug={node.fields.slug}
              tags={node.frontmatter.tags}
              title={node.frontmatter.title}
            />
          ))}
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
