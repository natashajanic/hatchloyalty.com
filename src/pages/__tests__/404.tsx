import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Layout from 'src/components/layout'
import NotFoundPage from '../404'

describe('NotFoundPage', () => {
  let mountedComponent: ShallowWrapper<any, any, NotFoundPage>

  beforeEach(() => {
    mountedComponent = shallow(<NotFoundPage />)
  })

  describe('render', () => {
    it('notifies the user that the page could not be found', async () => {
      expect(mountedComponent.find('h1').text()).toMatch(/Not Found/i)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
