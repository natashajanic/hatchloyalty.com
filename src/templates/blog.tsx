import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'src/components/layout'
import BlogPostFull from 'src/components/blog-post-full'
import Wrapper from 'src/components/wrapper'
import SEO from 'src/components/seo'
import { IBlogPost } from 'src/models'

interface IBlogTemplateProps {
  data: {
    post: IBlogPost
  }
}

class BlogTemplate extends React.Component<IBlogTemplateProps, {}> {
  render() {
    const { post } = this.props.data
    return (
      <Layout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Wrapper py={3}>
          <BlogPostFull post={post} />
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      frontmatter {
        author
        date(formatString: "MMMM DD, YYYY")
        tags
        title
      }
      html
    }
  }
`
