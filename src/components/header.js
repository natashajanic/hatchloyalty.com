import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import system from 'system-components'
import HatchLogo from '../images/hatch-logo.svg'
import UILink from './UILink'

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
    <Link
      to="/"
    >
      <Logo src={HatchLogo}/>
    </Link>
    <Nav>
      <UILink
        to="/blog"
        color="grayDark"
      >
        Blog
      </UILink>
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
