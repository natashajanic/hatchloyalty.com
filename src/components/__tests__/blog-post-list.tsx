import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import BlogPostPreview from 'src/components/blog-post-preview'
import Pager from 'src/components/pager'
import Text from 'src/components/text'
import { mockBlogPost } from 'src/models/mocks'
import BlogPostList, { IBlogPostListProps } from '../blog-post-list'

describe('BlogPostList', () => {
  let props: IBlogPostListProps
  let mountedComponent: ShallowWrapper<any, any, BlogPostList>

  beforeEach(() => {
    props = {
      basePath: '/tests',
      descriptionSuffix: 'tagged with "Test"',
      pageCount: 3,
      pageNum: 1,
      posts: [mockBlogPost],
      totalCount: 27,
    }
    mountedComponent = shallow(<BlogPostList {...props} />)
  })

  describe('render', () => {
    it('renders a preview for each of the provided posts', async () => {
      mountedComponent.setProps({
        posts: [
          {
            ...mockBlogPost,
            fields: { slug: '/test-post-1' },
          },
          {
            ...mockBlogPost,
            fields: { slug: '/test-post-2' },
          },
          {
            ...mockBlogPost,
            fields: { slug: '/test-post-3' },
          },
        ],
      })
      expect(mountedComponent.find(BlogPostPreview).length).toEqual(3)
      expect(
        mountedComponent
          .find(BlogPostPreview)
          .at(0)
          .prop('post').fields.slug
      ).toEqual('/test-post-1')
      expect(
        mountedComponent
          .find(BlogPostPreview)
          .at(1)
          .prop('post').fields.slug
      ).toEqual('/test-post-2')
      expect(
        mountedComponent
          .find(BlogPostPreview)
          .at(2)
          .prop('post').fields.slug
      ).toEqual('/test-post-3')
    })

    it('renders a description of the posts being shown', async () => {
      expect(mountedComponent.find(Text).length).toEqual(1)
      expect(mountedComponent.find(Text).text()).toEqual(
        'Showing 1 of 27 posts tagged with "Test"'
      )
    })

    it('renders a description with no suffix if none is specified', async () => {
      mountedComponent.setProps({ descriptionSuffix: undefined })
      expect(mountedComponent.find(Text).length).toEqual(1)
      expect(mountedComponent.find(Text).text()).toEqual(
        'Showing 1 of 27 posts '
      )
    })

    it('renders a pager if there is than 1 page worth of posts', async () => {
      expect(mountedComponent.find(Pager).length).toEqual(1)
      const pager = mountedComponent.find(Pager).at(0)
      expect(pager.prop('basePath')).toEqual(props.basePath)
      expect(pager.prop('currentPage')).toEqual(props.pageNum)
      expect(pager.prop('maxPage')).toEqual(props.pageCount)
    })

    it('omits the pager if there is only 1 page worth of posts', async () => {
      mountedComponent.setProps({ pageCount: 1 })
      expect(mountedComponent.find(Pager).length).toEqual(0)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
