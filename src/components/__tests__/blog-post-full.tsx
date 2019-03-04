import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import { mockBlogPost } from 'src/models/mocks'
import BlogPostFull, { IBlogPostFullProps } from '../blog-post-full'

describe('BlogPostFull', () => {
  let props: IBlogPostFullProps
  let mountedComponent: ShallowWrapper<any, any, BlogPostFull>

  beforeEach(() => {
    props = {
      post: mockBlogPost,
    }
    mountedComponent = shallow(<BlogPostFull {...props} />)
  })

  describe('render', () => {
    it('renders the blog title', async () => {
      expect(mountedComponent.text()).toContain(mockBlogPost.frontmatter.title)
    })

    it('renders the author as a link to their profile page', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          frontmatter: { ...mockBlogPost.frontmatter, author: 'Sally Smith' },
        },
      })
      expect(mountedComponent.find(Link).length).toEqual(3)
      const authorLink = mountedComponent.find(Link).at(0)
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
      expect(mountedComponent.find(Link).length).toEqual(3)
      const testTagLink = mountedComponent.find(Link).at(1)
      expect(testTagLink.text()).toEqual('Test')
      expect(testTagLink.prop('to')).toEqual(`/blog/tags/test`)
      const prTagLink = mountedComponent.find(Link).at(2)
      expect(prTagLink.text()).toEqual('Press Release')
      expect(prTagLink.prop('to')).toEqual(`/blog/tags/press-release`)
    })

    it("renders the raw post's body as HTML", async () => {
      expect(mountedComponent.html()).toContain(mockBlogPost.html)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
