import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Headroom from 'react-headroom'
import Header, { IHeaderProps } from '../header'

describe('Header', () => {
  let props: IHeaderProps
  let mountedComponent: ShallowWrapper<any, any, Header>

  beforeEach(() => {
    props = {
      siteTitle: 'Hatch Loyalty',
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
    }
    mountedComponent = shallow(<Header {...props} />)
  })

  describe('render', () => {
    it('renders all content in a sticky header wrapper', async () => {
      expect(mountedComponent.find(Headroom).length).toEqual(1)
    })

    it('renders the Hatch logo', async () => {
      expect(
        mountedComponent.find('Styled(Component)[is="img"]').length
      ).toEqual(1)
      const logo = mountedComponent.find('Styled(Component)[is="img"]').at(0)
      expect(logo.prop('alt')).toEqual(props.siteTitle)
    })

    it('renders each specified navigation link', async () => {
      expect(mountedComponent.find(Link).length).toEqual(
        1 + props.navLinks.length
      )
      props.navLinks.forEach((navLink, index) => {
        const link = mountedComponent.find(Link).at(index + 1)
        expect(link.text()).toEqual(navLink.name)
        expect(link.prop('to')).toEqual(navLink.link)
      })
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
