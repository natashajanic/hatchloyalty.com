import React from "react"
import PropTypes from "prop-types"
import kebabCase from 'lodash/kebabCase'

// Components
import { Link, graphql } from "gatsby"
import system from 'system-components'
import BlogPostContainer from "../components/BlogPostContainer";
import BlogPostPreview from "../components/BlogPostPreview";
import Box from '../components/Box'
import Layout from '../components/layout'
import Pager from "../components/Pager";
import Text from '../components/Text'
import SEO from '../components/seo'
import Wrapper from '../components/Wrapper'

const TitleContainer = system({
  is: Box,
  mb: 4,
})

class TagTemplate extends React.Component {
  render() {
    const {
      pageContext: { pageCount, pageNum, tag, totalCount },
      data: {
        site: {
          siteMetadata: { siteTitle },
        },
        allMarkdownRemark: { edges },
      },
    } = this.props
    const tagHeader = `Showing ${edges.length} of ${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with "${tag}"`

    return (
      <Layout location={this.props.location} title={siteTitle} pageStyle="offWhite">
        <SEO title={tag} />
        <Wrapper>
          <BlogPostContainer
            is="main"
          >
            <TitleContainer>
              <Text is="h2" fontSize={4}>{tagHeader}</Text>
              <Text fontSize={3}><Link to="/tags">View to All tags</Link></Text>
            </TitleContainer>
            <Box>
              {edges.map(({ node }) => (
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
            </Box>
            {(pageCount > 1) && <Pager
                currentPage={pageNum}
                maxPage={pageCount}
                pathRoot={`/tags/${kebabCase(tag)}`}
              />}
          </BlogPostContainer>
        </Wrapper>
      </Layout>
    )
  }
}

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    pageCount: PropTypes.number,
    pageNum: PropTypes.number,
    pageOffset: PropTypes.number,
    pageSize: PropTypes.number,
    tag: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String, $pageOffset: Int, $pageSize: Int) {
    site {
      siteMetadata {
        title
      }
    }
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