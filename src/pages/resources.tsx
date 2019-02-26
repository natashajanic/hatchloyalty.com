import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { BookOpen } from 'react-feather'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Box from 'src/components/box'
import BlogPostContainer from 'src/components/blog-post-container'
import IconCircle from 'src/components/icon-circle'

interface IResourcesPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string
          fields: { slug: string }
          frontmatter: {
            title: string
          }
        }
      }>
    }
  }
}

class ResourcesPage extends React.Component<IResourcesPageProps, {}> {
  render() {
    const { data } = this.props
    const resources = data.allMarkdownRemark.edges.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <div key={node.fields.slug}>
          <Link
            to={`/resource${node.fields.slug}`}
            style={{
              color: '#666666',
              display: 'block',
              textDecoration: 'none',
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

          <Link to={`/resource${node.fields.slug}`} color="grayDark">
            Read More
          </Link>
        </div>
      )
    })

    return (
      <Layout pageStyle="offWhite">
        <SEO
          title="All Resources"
          keywords={[
            'hatch',
            'hatch loyalty',
            'loyalty',
            'docs',
            'personalization',
            'activation',
          ]}
        />
        <BlogPostContainer is="main">
          <Box display="flex" alignItems="center">
            <IconCircle bg="green">
              <BookOpen size={20} color="#fff" />
            </IconCircle>
            <Text fontSize={1} ml={2}>
              Hatch Resources/Docs
            </Text>
          </Box>

          <Text is="h2" fontSize={5}>
            Learn from experts. Hatch is here to help you build stronger
            relationships with your customers.
          </Text>

          {resources}
        </BlogPostContainer>
      </Layout>
    )
  }
}

export default ResourcesPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "resources" } } }
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
