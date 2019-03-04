import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import { mockResourcePost } from 'src/models/mocks'
import ResourcePostFull, { IResourcePostFullProps } from '../resource-post-full'

describe('ResourcePostFull', () => {
  let props: IResourcePostFullProps
  let mountedComponent: ShallowWrapper<any, any, ResourcePostFull>

  beforeEach(() => {
    props = {
      post: mockResourcePost,
    }
    mountedComponent = shallow(<ResourcePostFull {...props} />)
  })

  describe('render', () => {
    it('renders the resource title', async () => {
      expect(mountedComponent.text()).toContain(
        mockResourcePost.frontmatter.title
      )
    })

    it("renders the raw post's body as HTML", async () => {
      expect(mountedComponent.html()).toContain(mockResourcePost.html)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
