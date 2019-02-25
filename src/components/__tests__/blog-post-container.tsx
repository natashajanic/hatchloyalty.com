import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import BlogPostContainer from '../blog-post-container'

describe('BlogPostContainer', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<BlogPostContainer />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
