import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import TagListTemplate, { ITagListTemplateProps } from '../tag-list'

describe('TagListTemplate', () => {
  let props: ITagListTemplateProps
  let mountedComponent: ShallowWrapper<any, any, TagListTemplate>

  beforeEach(() => {
    props = {
      pageContext: {
        basePath: '/blog/tag',
        tags: [
          {
            name: 'Test',
            postCount: 15,
          },
          {
            name: 'Press Release',
            postCount: 6,
          },
          {
            name: 'Enterprise Loyalty',
            postCount: 9,
          },
        ],
      },
    }
    mountedComponent = shallow(<TagListTemplate {...props} />)
  })

  describe('render', () => {
    it('renders a title for the page', async () => {
      expect(mountedComponent.find('h2').text()).toEqual('Tags')
    })

    it('renders each of the tags along with its post count', async () => {
      expect(mountedComponent.find(Link).length).toEqual(3)
      const testLink = mountedComponent.find(Link).at(0)
      expect(testLink.prop('to')).toEqual('/blog/tag/test/')
      expect(testLink.text()).toContain('Test')
      expect(testLink.text()).toContain('(15)')
      const pressReleaseLink = mountedComponent.find(Link).at(1)
      expect(pressReleaseLink.prop('to')).toEqual('/blog/tag/press-release/')
      expect(pressReleaseLink.text()).toContain('Press Release')
      expect(pressReleaseLink.text()).toContain('(6)')
      const enterpriseLoyaltyLink = mountedComponent.find(Link).at(2)
      expect(enterpriseLoyaltyLink.prop('to')).toEqual(
        '/blog/tag/enterprise-loyalty/'
      )
      expect(enterpriseLoyaltyLink.text()).toContain('Enterprise Loyalty')
      expect(enterpriseLoyaltyLink.text()).toContain('(9)')
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
