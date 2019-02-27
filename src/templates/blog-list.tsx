import * as React from 'react'
import { graphql } from 'gatsby'
import { BookOpen } from 'react-feather'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Box from 'src/components/box'
import BlogPostContainer from 'src/components/blog-post-container'
import BlogPostPreview from 'src/components/blog-post-preview'
import IconCircle from 'src/components/icon-circle'
import Pager from 'src/components/pager'

interface IBlogListTemplateProps {
  pageContext: {
    pageCount: number
    pageNum: number
    totalCount: number
  }
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string
          fields: { slug: string }
          frontmatter: {
            author: string
            date: string
            featuredImage: any
            tags: string[]
            title: string
          }
        }
      }>
    }
  }
}

class BlogListTemplate extends React.Component<IBlogListTemplateProps, {}> {
  render() {
    const {
      pageContext: { pageCount, pageNum, totalCount },
      data,
    } = this.props
    const posts = data.allMarkdownRemark.edges.map(({ node }) => (
      <BlogPostPreview
        key={node.fields.slug}
        author={node.frontmatter.author}
        date={node.frontmatter.date}
        excerpt={node.excerpt}
        featuredImage={node.frontmatter.featuredImage}
        slug={node.fields.slug}
        tags={node.frontmatter.tags}
        title={node.frontmatter.title}
      />
    ))
    const pageDescription = `Showing ${posts.length} of ${totalCount}
      post${totalCount === 1 ? '' : 's'}`

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
        <BlogPostContainer is="main">
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

          <Text is="h2" fontSize={4} mt={4} mb={2}>
            {pageDescription}
          </Text>
          {posts}
          {pageCount > 1 && (
            <Pager
              currentPage={pageNum}
              maxPage={pageCount}
              basePath={`/blog`}
            />
          )}
        </BlogPostContainer>
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
        }
      }
    }
  }
`
