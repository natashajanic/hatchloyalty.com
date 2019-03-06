import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'

// Currently this library has a JS file that contains JSX content
// tslint:disable-next-line
// Source: https://github.com/ChristopherBiscardi/gatsby-mdx/blob/25cce51f41677fde33a525fe4af6599ed292ad22/packages/gatsby-mdx/context.js#L7
// This caused Jest to error when loading this file.
jest.mock('gatsby-mdx', () => ({
  __esModule: true,
  MDXRenderer: () => <div />,
}))
import { MDXRenderer } from 'gatsby-mdx'

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

    it('renders the post as MDX content if an MDX body is specified', async () => {
      mountedComponent.setProps({
        post: {
          ...mockBlogPost,
          mdxBody: 'function() { 1 === 1; }',
        },
      })
      expect(mountedComponent.find(MDXRenderer).length).toEqual(1)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
