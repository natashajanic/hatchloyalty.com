import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Helmet from 'react-helmet'
import Footer from '../footer'
import Header from '../header'
import { IPureLayoutProps, PureLayout } from '../layout'

describe('Layout', () => {
  let props: IPureLayoutProps
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    props = {
      pageStyle: 'offWhite',
      data: {
        site: {
          siteMetadata: {
            title: 'Hatch Loyalty',
            navLinks: [
              {
                name: 'Home',
                link: '/',
              },
              {
                name: 'Resources',
                link: '/resources',
              },
              {
                name: 'Blog',
                link: '/blogs',
              },
            ],
          },
        },
      },
    }
    mountedComponent = shallow(
      <PureLayout {...props}>Child Content</PureLayout>
    )
  })

  describe('render', () => {
    it('renders a helmet', async () => {
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      const helmet = mountedComponent.find(Helmet).at(0)
      expect(helmet.prop('title')).toEqual(props.data.site.siteMetadata.title)
    })

    it('renders a header', async () => {
      expect(mountedComponent.find(Header).length).toEqual(1)
    })

    it('renders the contained content', async () => {
      expect(mountedComponent.find('[role="main"]').length).toEqual(1)
      expect(
        mountedComponent
          .find('[role="main"]')
          .at(0)
          .text()
      ).toContain('Child Content')
    })

    it('renders a footer', async () => {
      expect(mountedComponent.find(Footer).length).toEqual(1)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
