import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import BlogPostList from 'src/components/blog-post-list'
import Layout from 'src/components/layout'
import Text from 'src/components/text'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import { IBlogPost } from 'src/models'

interface ITagTemplateProps {
  pageContext: {
    pageCount: number
    pageNum: number
    tag: string
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

class TagTemplate extends React.Component<ITagTemplateProps, {}> {
  render() {
    const {
      pageContext: { pageCount, pageNum, tag, totalCount },
      data: { allMarkdownRemark },
    } = this.props

    let posts: IBlogPost[] = []
    if (allMarkdownRemark && allMarkdownRemark.edges.length > 0) {
      posts = allMarkdownRemark.edges.map(edge => edge.node)
    }

    return (
      <Layout pageStyle="offWhite">
        <SEO title={tag} />
        <Wrapper>
          <Text fontSize={2} m={2} style={{ float: 'right' }}>
            <Link to="/blog/tags">View All tags</Link>
          </Text>

          <BlogPostList
            basePath={`/blog/tags/${kebabCase(tag)}`}
            descriptionSuffix={`tagged with "${tag}"`}
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

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String, $pageOffset: Int, $pageSize: Int) {
    allMarkdownRemark(
      limit: $pageSize
      skip: $pageOffset
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
