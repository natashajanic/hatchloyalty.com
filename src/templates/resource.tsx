import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/components/layout'
import ResourcePostFull from 'src/components/resource-post-full'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import { IResourcePost } from 'src/models'

interface IResourceTemplateProps {
  data: {
    post: IResourcePost
  }
}

class ResourceTemplate extends React.Component<IResourceTemplateProps, {}> {
  render() {
    const { post } = this.props.data
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper py={3}>
          <ResourcePostFull post={post} />
        </Wrapper>
      </Layout>
    )
  }
}

export default ResourceTemplate

export const pageQuery = graphql`
  query ResourceBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
  }
`
