import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import BlogPostContainer from 'src/components/blog-post-container'
import BlogPostPreview from 'src/components/blog-post-preview'
import Box from 'src/components/box'
import Layout from 'src/components/layout'
import Pager from 'src/components/pager'
import Text from 'src/components/text'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'

const TitleContainer = system({
  is: Box,
  mb: 4,
})

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

class TagTemplate extends React.Component<ITagTemplateProps, {}> {
  render() {
    const {
      pageContext: { pageCount, pageNum, tag, totalCount },
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props
    const posts = edges.map(({ node }) => (
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
    const tagHeader = `Showing ${posts.length} of ${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with "${tag}"`
    const pager = (
      <Pager
        currentPage={pageNum}
        maxPage={pageCount}
        basePath={`/blog/tags/${kebabCase(tag)}`}
      />
    )

    return (
      <Layout pageStyle="offWhite">
        <SEO title={tag} />
        <Wrapper>
          <BlogPostContainer is="main">
            <TitleContainer>
              <Text is="h2" fontSize={4}>
                {tagHeader}
              </Text>
              <Text fontSize={3}>
                <Link to="/blog/tags">View to All tags</Link>
              </Text>
            </TitleContainer>
            <Box>{posts}</Box>
            {pageCount > 1 && pager}
          </BlogPostContainer>
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
