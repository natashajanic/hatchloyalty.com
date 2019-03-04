import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import { mockBlogPost } from 'src/models/mocks'
import BlogPostPreview, { IBlogPostPreviewProps } from '../blog-post-preview'

describe('BlogPostPreview', () => {
  let props: IBlogPostPreviewProps
  let mountedComponent: ShallowWrapper<any, any, BlogPostPreview>

  beforeEach(() => {
    props = {
      post: mockBlogPost,
    }
    mountedComponent = shallow(<BlogPostPreview {...props} />)
  })

  describe('render', () => {
    it('renders the blog title as a link to the blog post', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          fields: { ...mockBlogPost.fields, slug: '/test-post-1/' },
          frontmatter: { ...mockBlogPost.frontmatter, title: 'Test Post 1' },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(5)
      const titleLink = mountedComponent.find(Link).at(0)
      expect(titleLink.text()).toEqual('Test Post 1')
      expect(titleLink.prop('to')).toEqual('/blog/test-post-1/')
    })

    it('renders the author as a link to their profile page', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          frontmatter: { ...mockBlogPost.frontmatter, author: 'Sally Smith' },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(5)
      const authorLink = mountedComponent.find(Link).at(1)
      expect(authorLink.text()).toEqual('Sally Smith')
      expect(authorLink.prop('to')).toEqual(`/team/sally-smith`)
    })

    it('renders the publication date for the blog post', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          frontmatter: {
            ...mockBlogPost.frontmatter,
            date: 'January 31, 2019',
          },
        },
      })
      expect(mountedComponent.text()).toContain('on January 31, 2019')
    })

    it('renders each tag as a link', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          frontmatter: {
            ...mockBlogPost.frontmatter,
            tags: ['Test', 'Press Release'],
          },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(5)
      const testTagLink = mountedComponent.find(Link).at(2)
      expect(testTagLink.text()).toEqual('Test')
      expect(testTagLink.prop('to')).toEqual(`/blog/tags/test`)
      const prTagLink = mountedComponent.find(Link).at(3)
      expect(prTagLink.text()).toEqual('Press Release')
      expect(prTagLink.prop('to')).toEqual(`/blog/tags/press-release`)
    })

    it('renders a feature image', async () => {
      expect(mountedComponent.find(Img).length).toEqual(1)
    })

    it('does not render a feature image if none is specified', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          frontmatter: {
            ...mockBlogPost.frontmatter,
            featuredImage: undefined,
          },
        },
      })
      expect(mountedComponent.find(Img).length).toEqual(0)
    })

    it('renders the excerpt for the blog post', async () => {
      expect(mountedComponent.find(Text).length).toEqual(1)
      expect(
        mountedComponent
          .find(Text)
          .render()
          .text()
      ).toContain(mockBlogPost.excerpt)
    })

    it('renders an explicit link to the blog post', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          fields: { ...mockBlogPost.fields, slug: '/test-post-1/' },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(5)
      const readMoreLink = mountedComponent.find(Link).last()
      expect(readMoreLink.text()).toEqual('Read More')
      expect(readMoreLink.prop('to')).toEqual(`/blog/test-post-1/`)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
