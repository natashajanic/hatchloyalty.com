import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Layout from '../components/layout'
import Panel from '../components/panel'
import SEO from '../components/seo'
import Wrapper from '../components/wrapper'

const TagListCard = system({
  is: Panel,
  px: 4,
  py: 4,
  my: 4,
})

interface ITagsListTemplateProps {
  pageContext: {
    basePath: string
    tags: Array<{ name: string; postCount: number }>
  }
}

class TagListTemplate extends React.Component<ITagsListTemplateProps, {}> {
  render() {
    const {
      pageContext: { basePath, tags },
    } = this.props
    const tagElements = tags.map(tag => (
      <li key={tag.name}>
        <Link to={`${basePath}/${kebabCase(tag.name)}/`}>
          {tag.name} ({tag.postCount})
        </Link>
      </li>
    ))

    return (
      <Layout pageStyle="offWhite">
        <SEO title="All Tags" />
        <Wrapper>
          <TagListCard>
            <h2>Tags</h2>
            <ul>{tagElements}</ul>
          </TagListCard>
        </Wrapper>
      </Layout>
    )
  }
}

export default TagListTemplate
