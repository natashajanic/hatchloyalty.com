import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import system from 'system-components'
import Box from '../components/Box'
import Layout from '../components/layout'
import Panel from '../components/Panel'
import SEO from '../components/seo'
import Wrapper from '../components/Wrapper'

const PostListCard = system({
  is: Panel,
  px: 4,
  py: 4,
  my: 4,
})
const NavContainer = system({
  is: Box,
  px: 4,
  py: 2,
  my: 2,
})

class TagTemplate extends React.Component {
  render() {
    const {
      pageContext: { tag },
      data: {
        allMarkdownRemark: { edges, totalCount },
        site: {
          siteMetadata: { siteTitle },
        },
      },
    } = this.props
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with "${tag}"`

    return (
      <Layout location={this.props.location} title={siteTitle} pageStyle="offWhite">
        <SEO title={tag} />
        <Wrapper>
          <PostListCard>
            <h2>{tagHeader}</h2>
            <ul>
              {edges.map(({ node }) => {
                const title = node.frontmatter.title
                const path = node.fields.slug

                return (
                  <li key={path}>
                    <Link to={path}>{title}</Link>
                  </li>
                )
              })}
            </ul>
          </PostListCard>
          <NavContainer>
            <Link to="/tags">&lt;&lt; Back to All tags</Link>
          </NavContainer>
        </Wrapper>
      </Layout>
    )
  }
}

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
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
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`