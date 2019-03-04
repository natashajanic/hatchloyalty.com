import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import Flex from 'src/components/flex'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import TeamMemberPreview from 'src/components/team-member-preview'
import Text from 'src/components/text'
import Wrapper from 'src/components/wrapper'
import { ITeamMember } from 'src/models'

export interface IPureTeamPageProps {
  data: {
    allMarkdownRemark: {
      teamMembers: Array<{
        name: string
        postCount: number
      }>
    }
    allTeamMembersJson: {
      edges: Array<{
        node: ITeamMember
      }>
    }
  }
}

export const PureTeamPage = (props: IPureTeamPageProps) => {
  const {
    data: {
      allMarkdownRemark: { teamMembers: postCounts },
      allTeamMembersJson: { edges },
    },
  } = props

  const teamMemberElements = edges.map(edge => {
    const memberPostDetails = postCounts.find(
      postDetails => postDetails.name === edge.node.name
    )
    const postCount = memberPostDetails ? memberPostDetails.postCount : 0
    return (
      <TeamMemberPreview
        key={edge.node.name}
        postCount={postCount}
        teamMember={edge.node}
      />
    )
  })

  return (
    <Layout pageStyle="offWhite">
      <SEO title="Hatch Team" />
      <Wrapper my={4}>
        <Text is="h1" fontSize={6} textAlign="center">
          Hatch Team
        </Text>
        <Flex justifyContent="center" my={3}>
          {teamMemberElements}
        </Flex>
      </Wrapper>
    </Layout>
  )
}

class TeamPage extends React.Component<{}, {}> {
  render() {
    const query = graphql`
      {
        allMarkdownRemark(
          limit: 2000
          filter: { fields: { sourceName: { eq: "blog" } } }
        ) {
          teamMembers: group(field: frontmatter___author) {
            name: fieldValue
            postCount: totalCount
          }
        }
        allTeamMembersJson(filter: { active: { eq: true } }) {
          edges {
            node {
              headshot {
                childImageSharp {
                  fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              name
              position
            }
          }
        }
      }
    `

    return (
      <StaticQuery
        query={query}
        render={data => <PureTeamPage {...this.props} data={data} />}
      />
    )
  }
}

export default TeamPage
