import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Text from 'src/components/text'
import ResourcePostList from 'src/components/resource-post-list'
import { mockResourcePost } from 'src/models/mocks'
import { PureResourcesPage, IPureResourcesPageProps } from '../resources'

describe('ResourcesPage', () => {
  let props: IPureResourcesPageProps
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    props = {
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                ...mockResourcePost,
                frontmatter: { title: 'Test Post 1' },
              },
            },
            {
              node: {
                ...mockResourcePost,
                frontmatter: { title: 'Test Post 2' },
              },
            },
            {
              node: {
                ...mockResourcePost,
                frontmatter: { title: 'Test Post 3' },
              },
            },
          ],
        },
      },
    }
    mountedComponent = shallow(<PureResourcesPage {...props} />)
  })

  describe('render', () => {
    it('displays a page title', async () => {
      expect(mountedComponent.find(Text).length).toEqual(2)
      const titleText = mountedComponent.find(Text).first()
      expect(titleText.text()).toEqual('Hatch Resources/Docs')
    })

    it('displays the list of resource posts', async () => {
      expect(mountedComponent.find(ResourcePostList).length).toEqual(1)
      expect(
        mountedComponent.find(ResourcePostList).prop('posts')
      ).toMatchObject([
        props.data.allMarkdownRemark.edges[0].node,
        props.data.allMarkdownRemark.edges[1].node,
        props.data.allMarkdownRemark.edges[2].node,
      ])
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
