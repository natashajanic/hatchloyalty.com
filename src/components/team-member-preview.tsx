import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import Panel from 'src/components/panel'
import Text from 'src/components/text'
import ProfileDefault from 'src/images/profile-default.jpg'
import { ITeamMember } from 'src/models'

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

export interface ITeamMemberPreviewProps {
  teamMember: ITeamMember
  postCount: number
}

class TeamMemberPreview extends React.Component<ITeamMemberPreviewProps, {}> {
  render() {
    const { teamMember, postCount } = this.props

    return (
      <TeamMemberCard key={kebabCase(teamMember.name)}>
        <Link to={`/team/${kebabCase(teamMember.name)}/`}>
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
}

export default TeamMemberPreview
