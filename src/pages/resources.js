import React from 'react'
import { graphql, Link } from 'gatsby'
import { BookOpen } from 'react-feather'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Text from '../components/Text'
import Box from '../components/Box'
import BlogPostContainer from '../components/BlogPostContainer'
import IconCircle from '../components/IconCircle'

class DocsIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title
    const resources = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle} pageStyle="offWhite">
        <SEO title="All Resources" keywords={['hatch', 'hatch loyalty', 'loyalty', 'docs', 'personalization', 'activation',]} />
        <BlogPostContainer
          is="main"
        >
          <Box display="flex" alignItems="center">
            <IconCircle bg="green">
              <BookOpen size={20} color="#fff" />
            </IconCircle>
            <Text fontSize={1} ml={2}>Hatch Resources/Docs</Text>
          </Box>

          <Text is="h2" fontSize={5}>Learn from experts. Hatch is here to help you build stronger relationships with your customers.</Text>

          {resources.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div
                key={node.fields.slug}
              >

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
              </div>
            )
          })}
        </BlogPostContainer>
      </Layout>
    )
  }
}

export default DocsIndex

export const docIndexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "resources"}}},

    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`