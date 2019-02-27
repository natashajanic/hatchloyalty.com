import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import Layout from 'src/components/layout'
import Panel from 'src/components/panel'
import SEO from 'src/components/seo'
import Text from 'src/components/text'
import Wrapper from 'src/components/wrapper'
import ProfileDefault from 'src/images/profile-default.jpg'
import { IGraphQLImage } from 'src/models'
import Flex from 'src/components/flex'

const TeamMemberCard = system({
  is: Panel,
  flex: 0,
  px: 4,
  py: 4,
  m: 3,
  textAlign: 'center',
})

const TeamMemberImageWrapper = system({
  is: Box,
  borderRadius: 50,
  height: 200,
  mx: 'auto',
  my: 2,
  overflow: 'hidden',
  width: 200,
})

interface ITeamTemplateProps {
  pageContext: {
    basePath: string
    teamMemberNames: string[]
  }
  data: {
    allMarkdownRemark: {
      teamMembers: Array<{
        name: string
        postCount: number
      }>
    }
    allTeamMembersJson: {
      edges: Array<{
        node: {
          headshot: IGraphQLImage
          name: string
          position: string
        }
      }>
    }
  }
}

class TeamTemplate extends React.Component<ITeamTemplateProps, {}> {
  renderTeamMember(teamMemberName: string) {
    const {
      pageContext: { basePath },
      data: {
        allMarkdownRemark: { teamMembers: postCounts },
        allTeamMembersJson: { edges },
      },
    } = this.props

    const matchingEdge = edges.find(edge => edge.node.name === teamMemberName)
    const teamMember = matchingEdge && matchingEdge.node
    if (!teamMember) {
      return null
    }

    const memberPostDetails = postCounts.find(
      postDetails => postDetails.name === teamMemberName
    )
    const postCount = memberPostDetails ? memberPostDetails.postCount : 0

    return (
      <TeamMemberCard key={kebabCase(teamMember.name)}>
        <Link to={`${basePath}/${kebabCase(teamMember.name)}/`}>
          <TeamMemberImageWrapper>
            {teamMember && teamMember.headshot ? (
              <Img fluid={teamMember.headshot.childImageSharp.fluid} />
            ) : (
              <img src={ProfileDefault} alt="" />
            )}
          </TeamMemberImageWrapper>
          <Text is="h2" fontSize={4}>
            {teamMember.name}
          </Text>
          <Text fontSize={3}>
            ({postCount} post{postCount === 1 ? '' : 's'})
          </Text>
        </Link>
      </TeamMemberCard>
    )
  }

  render() {
    const {
      pageContext: { teamMemberNames },
    } = this.props

    const teamMemberElements = teamMemberNames.map(name =>
      this.renderTeamMember(name)
    )
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
}

export default TeamTemplate

export const pageQuery = graphql`
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
    allTeamMembersJson {
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
