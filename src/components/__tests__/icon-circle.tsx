import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import IconCircle from '../icon-circle'

describe('IconCircle', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<IconCircle />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
