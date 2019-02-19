import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import system from 'system-components'
import HatchLogo from '../images/hatch-logo.svg'

const UIHeader = system({
  is: 'header',
  alignItems: 'center',
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

const Header = ({ siteTitle, navLinks }) => (
  <UIHeader>
    <Link to="/">
      <Logo src={HatchLogo} alt={siteTitle}/>
    </Link>

    <Nav>
      {
        navLinks.map(link =>
          <NavLink key={link.name}>
            <Link
              to={link.link}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              {link.name}
            </Link>
          </NavLink>
        )
      }
    </Nav>
  </UIHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
