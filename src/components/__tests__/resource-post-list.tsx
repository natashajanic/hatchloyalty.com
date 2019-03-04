import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import ResourcePostPreview from 'src/components/resource-post-preview'
import { mockResourcePost } from 'src/models/mocks'
import ResourcePostList, { IResourcePostListProps } from '../resource-post-list'

describe('ResourcePostList', () => {
  let props: IResourcePostListProps
  let mountedComponent: ShallowWrapper<any, any, ResourcePostList>

  beforeEach(() => {
    props = {
      posts: [mockResourcePost],
    }
    mountedComponent = shallow(<ResourcePostList {...props} />)
  })

  describe('render', () => {
    it('renders a preview for each of the provided posts', async () => {
      mountedComponent.setProps({
        posts: [
          {
            ...mockResourcePost,
            fields: { slug: '/test-post-1' },
          },
          {
            ...mockResourcePost,
            fields: { slug: '/test-post-2' },
          },
          {
            ...mockResourcePost,
            fields: { slug: '/test-post-3' },
          },
        ],
      })
      expect(mountedComponent.find(ResourcePostPreview).length).toEqual(3)
      expect(
        mountedComponent
          .find(ResourcePostPreview)
          .at(0)
          .prop('post').fields.slug
      ).toEqual('/test-post-1')
      expect(
        mountedComponent
          .find(ResourcePostPreview)
          .at(1)
          .prop('post').fields.slug
      ).toEqual('/test-post-2')
      expect(
        mountedComponent
          .find(ResourcePostPreview)
          .at(2)
          .prop('post').fields.slug
      ).toEqual('/test-post-3')
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
