import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link } from "gatsby"
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

class TagsListTemplate extends React.Component {
  render() {
    const { pageContext: { basePath, tags } } = this.props

    return (
      <Layout pageStyle="offWhite">
        <SEO title="All Tags" />
        <Wrapper>
          <TagListCard>
            <h2>Tags</h2>
            <ul>
              {tags.map(tag => (
                <li key={tag.name}>
                  <Link to={`${basePath}/${kebabCase(tag.name)}/`}>
                    {tag.name} ({tag.postCount})
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

TagsListTemplate.propTypes = {
  pageContext: PropTypes.shape({
    basePath: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        postCount: PropTypes.number.isRequired,
      }).isRequired
    ),
  }),
}

export default TagsListTemplate
