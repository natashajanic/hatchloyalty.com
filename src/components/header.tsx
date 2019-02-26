import { Link } from 'gatsby'
import * as React from 'react'
import system from 'system-components'
import Wrapper from 'src/components/wrapper'
import HatchLogo from 'src/images/hatch-logo.svg'

const UIHeader = system({
  is: 'header',
  bg: 'offWhite',
  py: 3,
})

const Logo = system({
  is: 'img',
  m: 0,
  width: '125px',
})

const Nav = system({
  is: 'nav',
  display: 'flex',
})

const NavLink = system(
  {
    is: 'li',
    color: 'offBlack',
    fontSize: 3,
    fontWeight: 600,
    px: 2,
    m: 0,
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
      <UIHeader>
        <Wrapper
          alignItems="center"
          display={['block', 'flex']}
          justifyContent="space-between"
        >
          <Link to="/">
            <Logo src={HatchLogo} alt={siteTitle} />
          </Link>

          <Nav>{links}</Nav>
        </Wrapper>
      </UIHeader>
    )
  }
}

export default Header
