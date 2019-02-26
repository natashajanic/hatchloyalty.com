import { StaticQuery, graphql } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'
import system from 'system-components'
import { ThemeProvider } from 'styled-components'
import theme from 'src/theme'
import Header from './header'
import Footer from './footer'

/* tslint:disable-next-line no-import-side-effect */
import './layout.css'

const PageWrapper = system(
  {
    is: 'div',
    bg: 'white',
  },
  'bg',
  'color'
)

const Main = system({
  is: 'main',
})

export interface IPureLayoutProps extends ILayoutProps {
  children?: React.ReactNode
  data: {
    site: {
      siteMetadata: {
        title: string
        navLinks: Array<{ name: string; link: string }>
      }
    }
  }
}

export const PureLayout = (props: IPureLayoutProps) => {
  const { children, data, pageStyle } = props
  const meta = [
    {
      name: 'description',
      content: 'Hatch: Loyalty is an outcome.',
    },
    {
      name: 'keywords',
      content:
        'hatch, loyalty, hatch loyalty, api, customer activation, data activation, platform',
    },
  ]
  return (
    <>
      <Helmet title={data.site.siteMetadata.title} meta={meta}>
        <html lang="en" />
      </Helmet>

      <ThemeProvider theme={theme}>
        <PageWrapper bg={pageStyle}>
          <Header
            navLinks={data.site.siteMetadata.navLinks}
            siteTitle={data.site.siteMetadata.title}
          />
          <Main role="main">{children}</Main>
          <Footer />
        </PageWrapper>
      </ThemeProvider>
    </>
  )
}

interface ILayoutProps {
  pageStyle?: any
}

class Layout extends React.Component<ILayoutProps, {}> {
  render() {
    const query = graphql`
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
    `

    return (
      <StaticQuery
        query={query}
        render={data => <PureLayout {...this.props} data={data} />}
      />
    )
  }
}

export default Layout
