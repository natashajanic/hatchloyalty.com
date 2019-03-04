import Img from 'gatsby-image'
import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import Text from 'src/components/text'
import ProfileDefault from 'src/images/profile-default.jpg'
import { ITeamMember } from 'src/models'

const ProfileContainer = system({
  is: Box,
  m: 4,
  textAlign: 'center',
})

const ProfileImageWrapper = system({
  is: Box,
  borderRadius: 62.5,
  height: 250,
  mx: 'auto',
  my: 2,
  overflow: 'hidden',
  width: 250,
})

export interface ITeamMemberProfileProps {
  teamMember: ITeamMember
}

class TeamMemberProfile extends React.Component<ITeamMemberProfileProps, {}> {
  render() {
    const { teamMember } = this.props

    const profileImage =
      teamMember && teamMember.headshot ? (
        <Img fluid={teamMember.headshot.childImageSharp.fluid} />
      ) : (
        <img src={ProfileDefault} alt="" />
      )

    return (
      <ProfileContainer>
        <ProfileImageWrapper>{profileImage}</ProfileImageWrapper>
        <Text is="h1" fontSize={5}>
          {teamMember.name}
        </Text>
        <Text fontSize={2}>{teamMember && teamMember.position}</Text>
      </ProfileContainer>
    )
  }
}

export default TeamMemberProfile
