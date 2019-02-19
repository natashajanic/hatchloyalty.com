import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import system from 'system-components'
import Layout from "../components/layout"
import Panel from '../components/panel'
import SEO from '../components/seo'
import Wrapper from "../components/wrapper"

const TagListCard = system({
  is: Panel,
  px: 4,
  py: 4,
  my: 4,
})

class TagsPage extends React.Component {
  render() {
    const {
      data: {
        allMarkdownRemark: { group },
      },
    } = this.props

    return (
      <Layout pageStyle="offWhite">
        <SEO title="All Tags" />
        <Wrapper>
          <TagListCard>
            <h2>Tags</h2>
            <ul>
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </TagListCard>
        </Wrapper>
      </Layout>
    )
  }
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      filter: {fields: {sourceName: {eq: "blog"}}}
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
