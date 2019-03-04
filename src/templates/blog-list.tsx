import * as React from 'react'
import { graphql } from 'gatsby'
import { BookOpen } from 'react-feather'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Box from 'src/components/box'
import BlogPostList from 'src/components/blog-post-list'
import IconCircle from 'src/components/icon-circle'
import Wrapper from 'src/components/wrapper'
import { IBlogPost } from 'src/models'

interface IBlogListTemplateProps {
  pageContext: {
    pageCount: number
    pageNum: number
    totalCount: number
  }
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: IBlogPost
      }>
    }
  }
}

class BlogListTemplate extends React.Component<IBlogListTemplateProps, {}> {
  render() {
    const {
      pageContext: { pageCount, pageNum, totalCount },
      data: { allMarkdownRemark },
    } = this.props

    let posts: IBlogPost[] = []
    if (allMarkdownRemark && allMarkdownRemark.edges.length > 0) {
      posts = allMarkdownRemark.edges.map(edge => edge.node)
    }

    return (
      <Layout pageStyle="offWhite">
        <SEO
          title="All Posts"
          keywords={[
            'hatch',
            'hatch loyalty',
            'loyalty',
            'blog',
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
              Hatch Insights
            </Text>
          </Box>

          <Text is="h2" fontSize={5}>
            Learn from experts. Hatch is here to help you build stronger
            relationships with your customers.
          </Text>

          <BlogPostList
            basePath="/blog"
            pageCount={pageCount}
            pageNum={pageNum}
            posts={posts}
            totalCount={totalCount}
          />
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogListTemplate

export const pageQuery = graphql`
  query($pageOffset: Int, $pageSize: Int) {
    allMarkdownRemark(
      limit: $pageSize
      skip: $pageOffset
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "blog" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            author
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
            tags
            title
          }
          html
        }
      }
    }
  }
`
