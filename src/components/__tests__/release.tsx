import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Badge from 'src/components/badge'
import { mockRelease } from 'src/models/mocks'
import Release, { IReleaseProps } from '../release'

describe('Release', () => {
  let props: IReleaseProps
  let mountedComponent: ShallowWrapper<any, any, Release>

  beforeEach(() => {
    props = {
      release: mockRelease,
    }
    mountedComponent = shallow(<Release {...props} />)
  })

  describe('render', () => {
    it('renders the name of the release', async () => {
      expect(mountedComponent.find('Text[as="h3"]').length).toEqual(1)
      expect(mountedComponent.find('Text[as="h3"]').text()).toEqual(
        props.release.name
      )
    })

    it('renders each change contained within the release', async () => {
      expect(mountedComponent.find(Badge).length).toEqual(
        props.release.changes.length
      )
      props.release.changes.forEach((change, index) => {
        expect(
          mountedComponent
            .find(Badge)
            .at(index)
            .text()
        ).toEqual(change.component)
        expect(mountedComponent.text()).toContain(change.description)
      })
    })

    it('renders a link for any change that has one specified', async () => {
      mountedComponent.setProps({
        release: {
          ...mockRelease,
          changes: [
            {
              component: 'Test',
              description: 'Test Change',
              link: 'https://developer.hatchloyalty.com/test-change',
            },
          ],
        },
      })
      expect(mountedComponent.find('a').length).toEqual(1)
      const changeLink = mountedComponent.find('a')
      expect(changeLink.prop('href')).toEqual(
        'https://developer.hatchloyalty.com/test-change'
      )
      expect(changeLink.text()).toEqual('Click to read more')
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
