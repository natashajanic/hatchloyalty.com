import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import { mockTeamMember } from 'src/models/mocks'
import TeamMemberPreview, {
  ITeamMemberPreviewProps,
} from '../team-member-preview'

describe('TeamMemberPreview', () => {
  let props: ITeamMemberPreviewProps
  let mountedComponent: ShallowWrapper<any, any, TeamMemberPreview>

  beforeEach(() => {
    props = {
      teamMember: mockTeamMember,
      postCount: 12,
    }
    mountedComponent = shallow(<TeamMemberPreview {...props} />)
  })

  describe('render', () => {
    it('renders a link to view the full details of the team member', async () => {
      mountedComponent.setProps({
        teamMember: { ...mockTeamMember, name: 'Sally Smith' },
      })
      expect(mountedComponent.find(Link).length).toEqual(1)
      const titleLink = mountedComponent.find(Link).at(0)
      expect(titleLink.prop('to')).toEqual('/team/sally-smith/')
    })

    it("renders the team member's name", async () => {
      expect(mountedComponent.text()).toContain(mockTeamMember.name)
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

    it('renders the number of posts authored by the team member', async () => {
      expect(
        mountedComponent
          .find(Text)
          .last()
          .text()
      ).toEqual('(12 posts)')
    })

    it('uses proper pluralization for single post counts', async () => {
      mountedComponent.setProps({ postCount: 1 })
      expect(
        mountedComponent
          .find(Text)
          .last()
          .text()
      ).toEqual('(1 post)')
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
