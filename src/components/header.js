import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import system from 'system-components'
import HatchLogo from '../images/hatch-logo.svg'
import Wrapper from './Wrapper.js'
import Box from './Box'

const UIHeader = system({
  is: 'header',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  py: 3,
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
    <Wrapper>
      <Box
        is="div"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
      >
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
      </Box>
    </Wrapper>
  </UIHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
