import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from '../text'
import BlogPostPreview, { IBlogPostPreviewProps } from '../blog-post-preview'

describe('BlogPostPreview', () => {
  let props: IBlogPostPreviewProps
  let mountedComponent: ShallowWrapper<any, any, BlogPostPreview>

  beforeEach(() => {
    props = {
      author: 'John Doe',
      date: 'February 25, 2019',
      excerpt: 'This is the excerpt for a test post.',
      featuredImage: undefined,
      slug: '/2019-02-25-test-post/',
      tags: ['Test', 'Press Release'],
      title: 'Test Post',
    }
    mountedComponent = shallow(<BlogPostPreview {...props} />)
  })

  describe('render', () => {
    it('renders the blog title as a link to the blog post', async () => {
      expect(mountedComponent.find(Link).length).toEqual(5)
      const titleLink = mountedComponent.find(Link).at(0)
      expect(titleLink.text()).toEqual(props.title)
      expect(titleLink.prop('to')).toEqual(`/blog/2019-02-25-test-post/`)
    })

    it('renders the author as a link to their profile page', async () => {
      expect(mountedComponent.find(Link).length).toEqual(5)
      const authorLink = mountedComponent.find(Link).at(1)
      expect(authorLink.text()).toEqual(props.author)
      expect(authorLink.prop('to')).toEqual(`/team/john-doe`)
    })

    it('renders the publication date for the blog post', async () => {
      expect(mountedComponent.text()).toContain('on February 25, 2019')
    })

    it('renders each tag as a link', async () => {
      expect(mountedComponent.find(Link).length).toEqual(5)
      const testTagLink = mountedComponent.find(Link).at(2)
      expect(testTagLink.text()).toEqual('Test')
      expect(testTagLink.prop('to')).toEqual(`/blog/tags/test`)
      const prTagLink = mountedComponent.find(Link).at(3)
      expect(prTagLink.text()).toEqual('Press Release')
      expect(prTagLink.prop('to')).toEqual(`/blog/tags/press-release`)
    })

    it('renders a feature image', async () => {
      mountedComponent.setProps({
        featuredImage: {
          childImageSharp: {
            fluid: {
              aspectRatio: 1,
              src: 'test/imgs/test-blog.png',
              srcSet: '',
              sizes: '',
            },
          },
        },
      })
      expect(mountedComponent.find(Img).length).toEqual(1)
    })

    it('does not render a feature image if none is specified', async () => {
      expect(mountedComponent.find(Img).length).toEqual(0)
    })

    it('renders the excerpt for the blog post', async () => {
      expect(mountedComponent.find(Text).length).toEqual(1)
      expect(
        mountedComponent
          .find(Text)
          .at(0)
          .render()
          .text()
      ).toContain(props.excerpt)
    })

    it('renders an explicit link to the blog post', async () => {
      expect(mountedComponent.find(Link).length).toEqual(5)
      const readMoreLink = mountedComponent.find(Link).last()
      expect(readMoreLink.text()).toEqual('Read More')
      expect(readMoreLink.prop('to')).toEqual(`/blog/2019-02-25-test-post/`)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
