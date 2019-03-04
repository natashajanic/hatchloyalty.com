import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Release from 'src/components/release'
import ReleaseNavigation from 'src/components/release-navigation'
import { mockRelease } from 'src/models/mocks'
import ReleaseTemplate, { IReleaseTemplateProps } from '../release'

describe('ReleaseTemplate', () => {
  let props: IReleaseTemplateProps
  let mountedComponent: ShallowWrapper<any, any, ReleaseTemplate>

  beforeEach(() => {
    props = {
      pageContext: {
        release: mockRelease,
        previous: { ...mockRelease, name: 'Test Previous Release' },
        next: { ...mockRelease, name: 'Test Next Release' },
      },
    }
    mountedComponent = shallow(<ReleaseTemplate {...props} />)
  })

  describe('render', () => {
    it('renders navigation to the next and previous releases', async () => {
      expect(mountedComponent.find(ReleaseNavigation).length).toEqual(1)
      expect(
        mountedComponent.find(ReleaseNavigation).prop('next')
      ).toMatchObject(props.pageContext.next)
      expect(
        mountedComponent.find(ReleaseNavigation).prop('previous')
      ).toMatchObject(props.pageContext.previous)
    })

    it('renders the current release', async () => {
      expect(mountedComponent.find(Release).length).toEqual(1)
      expect(mountedComponent.find(Release).prop('release')).toMatchObject(
        props.pageContext.release
      )
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
