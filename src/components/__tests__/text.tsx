import { mount, ReactWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from '../text'

describe('Text', () => {
  let mountedComponent: ReactWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = mount(<Text>Test 123</Text>)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly setup to truncate', async () => {
      mountedComponent.setProps({ truncate: 3 })
      expect(mountedComponent).toMatchSnapshot()
    })
  })

  it('has a display name', () => {
    expect(Text.displayName).toEqual('Text')
  })
})
