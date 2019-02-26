import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Wrapper from '../wrapper'

describe('Wrapper', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Wrapper />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
