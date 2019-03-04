import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Wrapper from 'src/components/wrapper'
import { PureIndexPage, IPureIndexPageProps } from '../index'

describe('IndexPage', () => {
  let props: IPureIndexPageProps
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    props = {
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                excerpt: 'Test post 1 excerpt.',
                fields: { slug: '/test-post-1/' },
                frontmatter: { title: 'Test Post 1' },
              },
            },
            {
              node: {
                excerpt: 'Test post 2 excerpt.',
                fields: { slug: '/test-post-2/' },
                frontmatter: { title: 'Test Post 2' },
              },
            },
            {
              node: {
                excerpt: 'Test post 3 excerpt.',
                fields: { slug: '/test-post-3/' },
                frontmatter: { title: 'Test Post 3' },
              },
            },
          ],
        },
      },
    }
    mountedComponent = shallow(<PureIndexPage {...props} />)
  })

  describe('render', () => {
    it('displays a page title', async () => {
      expect(mountedComponent.find('h2').length).toEqual(1)
      expect(mountedComponent.find('h2').text()).toContain('Hello, Hatch')
    })

    it('displays links to the features section', async () => {
      expect(mountedComponent.find(Link).length).toEqual(3)
      expect(
        mountedComponent
          .find(Link)
          .at(0)
          .prop('to')
      ).toEqual('/features')
      expect(
        mountedComponent
          .find(Link)
          .at(1)
          .prop('to')
      ).toEqual('/features')
      expect(
        mountedComponent
          .find(Link)
          .at(2)
          .prop('to')
      ).toEqual('/features')
    })

    it('renders a teaser for each of the features posts', async () => {
      expect(mountedComponent.find(Wrapper).text()).toContain('Test Post 1')
      expect(mountedComponent.find(Wrapper).text()).toContain(
        'Test post 1 excerpt.'
      )
      expect(mountedComponent.find(Wrapper).text()).toContain('Test Post 2')
      expect(mountedComponent.find(Wrapper).text()).toContain(
        'Test post 2 excerpt.'
      )
      expect(mountedComponent.find(Wrapper).text()).toContain('Test Post 3')
      expect(mountedComponent.find(Wrapper).text()).toContain(
        'Test post 3 excerpt.'
      )
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
