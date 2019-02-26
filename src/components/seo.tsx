import { StaticQuery, graphql } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'

type MetaEntry =
  | { name: string; content: any; property?: undefined }
  | { property: string; content: any; name?: undefined }

export interface IPureSEOProps {
  data: {
    site: {
      siteMetadata: {
        author: string
        description: string
        title: string
      }
    }
  }
  description?: string
  keywords?: string[]
  lang?: string
  meta?: MetaEntry[]
  title: string
}

export const PureSEO = (props: IPureSEOProps) => {
  const { data, description, keywords, lang, meta, title } = props
  const metaDescription = description || data.site.siteMetadata.description
  const metaEntries = [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: data.site.siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ]
    .concat(
      keywords && keywords.length > 0
        ? {
            name: 'keywords',
            content: keywords.join(', '),
          }
        : []
    )
    .concat(meta || [])

  return (
    <Helmet
      htmlAttributes={{ lang: lang || 'en' }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={metaEntries}
    />
  )
}

interface ISEOProps {
  description?: string
  keywords?: string[]
  lang?: string
  meta?: MetaEntry[]
  title: string
}

class SEO extends React.Component<ISEOProps, {}> {
  render() {
    const query = graphql`
      query DefaultSEOQuery {
        site {
          siteMetadata {
            author
            description
            title
          }
        }
      }
    `
    return (
      <StaticQuery
        query={query}
        render={data => <PureSEO {...this.props} data={data} />}
      />
    )
  }
}

export default SEO
