import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import { mockTeamMember } from 'src/models/mocks'
import TeamMemberProfile, {
  ITeamMemberProfileProps,
} from '../team-member-profile'

describe('TeamMemberProfile', () => {
  let props: ITeamMemberProfileProps
  let mountedComponent: ShallowWrapper<any, any, TeamMemberProfile>

  beforeEach(() => {
    props = {
      teamMember: mockTeamMember,
    }
    mountedComponent = shallow(<TeamMemberProfile {...props} />)
  })

  describe('render', () => {
    it("renders the team member's name", async () => {
      expect(mountedComponent.text()).toContain(mockTeamMember.name)
    })

    it("renders the team member's position", async () => {
      expect(mountedComponent.text()).toContain(mockTeamMember.position)
    })

    it("renders the team member's headshot", async () => {
      expect(mountedComponent.find(Img).length).toEqual(1)
      expect(mountedComponent.find(Img).prop('fluid')).toBeDefined()
    })

    it('renders a default headshot if none is set for the team member', async () => {
      mountedComponent.setProps({
        teamMember: { ...mockTeamMember, headshot: undefined },
      })
      expect(mountedComponent.find('img').length).toEqual(1)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
