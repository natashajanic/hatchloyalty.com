import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import system from 'system-components'
import HatchLogo from '../images/hatch-logo.svg'

const UIHeader = system({
  is: 'header',
  alignItems: 'center',
  bg: 'white',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  display: 'flex',
  justifyContent: 'space-between',
  px: 3,
  py: 3,
})

const Logo = system({
  is: 'img',
  m: 0,
  width: '150px',
})

const Nav = system({
  is: 'nav',
})

const Header = ({ siteTitle }) => (
  <UIHeader>
    <Link to="/">
      <Logo src={HatchLogo}/>
    </Link>

    <Nav>
      <Link to="/features">Features</Link>
      <Link to="/blog">Blog</Link>
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
