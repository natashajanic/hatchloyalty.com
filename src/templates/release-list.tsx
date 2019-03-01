import { graphql } from 'gatsby'
import { groupBy, kebabCase, keys } from 'lodash'
import * as moment from 'moment'
import * as React from 'react'
import Box from 'src/components/box'
import ChangelogIntro from 'src/components/changelog-intro'
import Layout from 'src/components/layout'
import Pager from 'src/components/pager'
import Release from 'src/components/release'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Wrapper from 'src/components/wrapper'
import { IRelease } from 'src/models'

interface IReleaseListTemplateProps {
  pageContext: {
    pageCount: number
    pageNum: number
    totalCount: number
  }
  data: {
    releaseResults: {
      edges: Array<{
        node: IRelease
      }>
    }
  }
}

class ReleaseListTemplate extends React.Component<
  IReleaseListTemplateProps,
  {}
> {
  render() {
    const {
      pageContext: { pageCount, pageNum },
      data: { releaseResults },
    } = this.props

    const monthlyReleases = groupBy(releaseResults.edges, edge =>
      moment(edge.node.date).format('MMMM YYYY')
    )
    const releaseList = keys(monthlyReleases).map(month => (
      <Box key={`releases-${kebabCase(month)}`} my={6}>
        <Text color="green" fontSize={5} my={3} pb={1}>
          {month}
        </Text>
        {monthlyReleases[month].map(edge => (
          <Release key={kebabCase(edge.node.name)} release={edge.node} />
        ))}
      </Box>
    ))

    return (
      <Layout pageStyle="offWhite">
        <SEO
          title="Changelog"
          keywords={[
            'hatch',
            'hatch loyalty',
            'loyalty',
            'blog',
            'personalization',
            'activation',
            'changelog',
          ]}
        />
        <Wrapper>
          <ChangelogIntro />

          <Box mx="auto" width="75%">
            {releaseList}
          </Box>

          {pageCount > 1 && (
            <Pager
              currentPage={pageNum}
              maxPage={pageCount}
              basePath={`/releases`}
            />
          )}
        </Wrapper>
      </Layout>
    )
  }
}

export default ReleaseListTemplate

export const pageQuery = graphql`
  query($pageOffset: Int, $pageSize: Int) {
    releaseResults: allReleasesJson(
      limit: $pageSize
      skip: $pageOffset
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          changes {
            component
            description
            link
          }
          date
          name
        }
      }
    }
  }
`
