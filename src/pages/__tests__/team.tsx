import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import TeamMemberPreview from 'src/components/team-member-preview'
import { mockTeamMember } from 'src/models/mocks'
import { PureTeamPage, IPureTeamPageProps } from '../team'

describe('TeamPage', () => {
  let props: IPureTeamPageProps
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    props = {
      data: {
        allMarkdownRemark: {
          teamMembers: [
            {
              name: 'Sally Smith',
              postCount: 6,
            },
            {
              name: 'John Doe',
              postCount: 15,
            },
          ],
        },
        allTeamMembersJson: {
          edges: [
            {
              node: { ...mockTeamMember, name: 'John Doe' },
            },
            {
              node: { ...mockTeamMember, name: 'Sally Smith' },
            },
            {
              node: { ...mockTeamMember, name: 'George Miller' },
            },
          ],
        },
      },
    }
    mountedComponent = shallow(<PureTeamPage {...props} />)
  })

  describe('render', () => {
    it('displays a page title', async () => {
      expect(mountedComponent.find(Text).length).toEqual(1)
      const titleText = mountedComponent.find(Text).first()
      expect(titleText.text()).toEqual('Hatch Team')
    })

    it('displays a preview for each active team member', async () => {
      expect(mountedComponent.find(TeamMemberPreview).length).toEqual(3)
      const johnDoePreview = mountedComponent.find(TeamMemberPreview).at(0)
      expect(johnDoePreview.prop('teamMember')).toMatchObject({
        ...mockTeamMember,
        name: 'John Doe',
      })
      expect(johnDoePreview.prop('postCount')).toEqual(15)
      const sallySmithPreview = mountedComponent.find(TeamMemberPreview).at(1)
      expect(sallySmithPreview.prop('teamMember')).toMatchObject({
        ...mockTeamMember,
        name: 'Sally Smith',
      })
      expect(sallySmithPreview.prop('postCount')).toEqual(6)
      const georgeMillerPreview = mountedComponent.find(TeamMemberPreview).at(2)
      expect(georgeMillerPreview.prop('teamMember')).toMatchObject({
        ...mockTeamMember,
        name: 'George Miller',
      })
      expect(georgeMillerPreview.prop('postCount')).toEqual(0)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
