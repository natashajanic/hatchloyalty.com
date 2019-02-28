import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import ReleaseNavigation, {
  IReleaseNavigationProps,
} from '../release-navigation'
import { mockRelease } from 'src/models/mocks'

describe('ReleaseNavigation', () => {
  let props: IReleaseNavigationProps
  let mountedComponent: ShallowWrapper<any, any, ReleaseNavigation>

  beforeEach(() => {
    props = {
      next: { ...mockRelease, name: 'Release 009' },
      previous: { ...mockRelease, name: 'Release 007' },
    }
    mountedComponent = shallow(<ReleaseNavigation {...props} />)
  })

  describe('render', () => {
    it('renders a link to the previous release', async () => {
      expect(mountedComponent.find(Link).length).toEqual(3)
      const prevLink = mountedComponent.find(Link).at(0)
      expect(prevLink.prop('to')).toEqual('/releases/release-007')
      expect(prevLink.text()).toContain(props.previous!.name)
    })

    it('omits the link to the previous release if none is specified', async () => {
      mountedComponent.setProps({ previous: undefined })
      expect(mountedComponent.find(Link).length).toEqual(2)
    })

    it('renders a link to the full changelog', async () => {
      expect(mountedComponent.find(Link).length).toEqual(3)
      const changelogLink = mountedComponent.find(Link).at(1)
      expect(changelogLink.prop('to')).toEqual('/releases')
      expect(changelogLink.text()).toContain('View All Releases')
    })

    it('renders a link to the next release', async () => {
      expect(mountedComponent.find(Link).length).toEqual(3)
      const nextLink = mountedComponent.find(Link).at(2)
      expect(nextLink.prop('to')).toEqual('/releases/release-009')
      expect(nextLink.text()).toContain(props.next!.name)
    })

    it('omits the link to the next release if none is specified', async () => {
      mountedComponent.setProps({ next: undefined })
      expect(mountedComponent.find(Link).length).toEqual(2)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })

    it('matches the expected snapshot when there is no previous release', async () => {
      mountedComponent.setProps({ previous: undefined })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('matches the expected snapshot when there is no next release', async () => {
      mountedComponent.setProps({ next: undefined })
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
