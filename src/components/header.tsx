import { Link } from 'gatsby'
import * as React from 'react'
import Headroom from 'react-headroom'
import system from 'system-components'
import HatchLogo from 'src/images/hatch-logo.svg'

const UIHeader = system({
  is: 'header',
  alignItems: 'center',
  background: 'white',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  display: 'flex',
  justifyContent: 'space-between',
  mx: 'auto',
  px: 3,
  py: 3,
  width: '1024px',
})

const Logo = system({
  is: 'img',
  m: 0,
  width: '125px',
})

const Nav = system({
  is: 'nav',
})

const NavLink = system(
  {
    is: 'li',
    color: 'offBlack',
    fontSize: 3,
    fontWeight: 400,
    display: 'inline-flex',
    px: 2,
  },
  {
    listStyleType: 'none',
  }
)

export interface IHeaderProps {
  siteTitle: string
  navLinks: Array<{ name: string; link: string }>
}

class Header extends React.Component<IHeaderProps, {}> {
  render() {
    const { siteTitle, navLinks } = this.props
    const links = navLinks.map(link => (
      <NavLink key={link.name}>
        <Link
          to={link.link}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {link.name}
        </Link>
      </NavLink>
    ))
    return (
      <Headroom>
        <UIHeader>
          <Link to="/">
            <Logo src={HatchLogo} alt={siteTitle} />
          </Link>

          <Nav>{links}</Nav>
        </UIHeader>
      </Headroom>
    )
  }
}

export default Header
