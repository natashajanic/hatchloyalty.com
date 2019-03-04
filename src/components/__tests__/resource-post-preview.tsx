import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import { mockResourcePost } from 'src/models/mocks'
import ResourcePostPreview, {
  IResourcePostPreviewProps,
} from '../resource-post-preview'

describe('ResourcePostPreview', () => {
  let props: IResourcePostPreviewProps
  let mountedComponent: ShallowWrapper<any, any, ResourcePostPreview>

  beforeEach(() => {
    props = {
      post: mockResourcePost,
    }
    mountedComponent = shallow(<ResourcePostPreview {...props} />)
  })

  describe('render', () => {
    it('renders the resource title as a link to the post', async () => {
      mountedComponent.setProps({
        post: {
          ...mockResourcePost,
          fields: { ...mockResourcePost.fields, slug: '/test-resource-1/' },
          frontmatter: {
            ...mockResourcePost.frontmatter,
            title: 'Test Resource Post 1',
          },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(2)
      const titleLink = mountedComponent.find(Link).at(0)
      expect(titleLink.text()).toEqual('Test Resource Post 1')
      expect(titleLink.prop('to')).toEqual('/resource/test-resource-1/')
    })

    it("renders the post's excerpt", async () => {
      expect(mountedComponent.find(Text).length).toEqual(1)
      expect(
        mountedComponent
          .find(Text)
          .render()
          .text()
      ).toEqual(mockResourcePost.excerpt)
    })

    it('renders an explicit link to the blog post', async () => {
      mountedComponent.setProps({
        post: {
          ...mockResourcePost,
          fields: { ...mockResourcePost.fields, slug: '/test-resource-1/' },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(2)
      const readMoreLink = mountedComponent.find(Link).last()
      expect(readMoreLink.text()).toEqual('Read More')
      expect(readMoreLink.prop('to')).toEqual(`/resource/test-resource-1/`)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
