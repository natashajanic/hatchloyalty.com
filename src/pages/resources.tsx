import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import { BookOpen } from 'react-feather'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Box from 'src/components/box'
import IconCircle from 'src/components/icon-circle'
import ResourcePostList from 'src/components/resource-post-list'
import Wrapper from 'src/components/wrapper'
import { IResourcePost } from 'src/models'

export interface IPureResourcesPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: IResourcePost
      }>
    }
  }
}

export const PureResourcesPage = (props: IPureResourcesPageProps) => {
  const { data } = props
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

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
      <Wrapper py={5}>
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

        <ResourcePostList posts={posts} />
      </Wrapper>
    </Layout>
  )
}

class ResourcesPage extends React.Component<{}, {}> {
  render() {
    const query = graphql`
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
              html
            }
          }
        }
      }
    `

    return (
      <StaticQuery
        query={query}
        render={data => <PureResourcesPage {...this.props} data={data} />}
      />
    )
  }
}

export default ResourcesPage
