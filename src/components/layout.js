import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import theme from '../theme'
import system from 'system-components'
import { ThemeProvider } from 'styled-components'
import Header from './header'
import Footer from './Footer'
import './layout.css'

const PageWrapper = system({
  is: 'div',
  bg: 'white',
},
  'bg',
  'color',
)

const Main = system({
  is: 'main',
})

const Layout = ({ children, pageStyle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            navLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Hatch: Loyalty is an outcome.' },
            { name: 'keywords', content: 'hatch, loyalty, hatch loyalty, api, customer activation, data activation, platform' },
          ]}
        >
          <html lang="en" />
        </Helmet>

        <ThemeProvider theme={theme}>
          <PageWrapper bg={pageStyle}>
            <Header
              navLinks={data.site.siteMetadata.navLinks}
              siteTitle={data.site.siteMetadata.title}
            />
            <Main role="main">
              {children}
            </Main>
            <Footer />
          </PageWrapper>
        </ThemeProvider>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
