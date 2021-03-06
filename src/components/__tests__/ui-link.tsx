import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import UILink from '../panel'

describe('UILink', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<UILink />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
