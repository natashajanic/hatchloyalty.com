import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Footer from '../footer'

describe('Footer', () => {
  let mountedComponent: ShallowWrapper<any, any, Footer>

  beforeEach(() => {
    mountedComponent = shallow(<Footer />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
