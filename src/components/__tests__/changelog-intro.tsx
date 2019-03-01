import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import ChangelogIntro from '../changelog-intro'

describe('ChangelogIntro', () => {
  let mountedComponent: ShallowWrapper<any, any, ChangelogIntro>

  beforeEach(() => {
    mountedComponent = shallow(<ChangelogIntro />)
  })

  describe('render', () => {
    it('renders the page title', async () => {
      expect(mountedComponent.find('Text[fontSize=8]').length).toEqual(1)
      expect(mountedComponent.find('Text[fontSize=8]').text()).toEqual(
        'Hatch Changelog'
      )
    })

    it('renders an intro paragraph', async () => {
      expect(mountedComponent.find('Text[fontSize=4]').length).toEqual(1)
      expect(mountedComponent.find('Text[fontSize=4]').text()).toContain(
        'Below is a list of'
      )
    })

    it('renders a button to allow users to subscribe for email notifications', async () => {
      expect(mountedComponent.find('button').length).toEqual(1)
      expect(mountedComponent.find('button').text()).toEqual(
        'Email for Updates'
      )
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
