import * as React from 'react'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import { IStaticPage } from 'src/models'

export interface IStaticPageTemplateProps {
  pageContext: {
    page: IStaticPage
  }
}

class StaticPageTemplate extends React.Component<IStaticPageTemplateProps, {}> {
  render() {
    const { page } = this.props.pageContext

    return (
      <Layout>
        <SEO
          title={page.frontmatter.title}
          keywords={[
            'hatch',
            'hatch loyalty',
            'loyalty',
            'docs',
            'personalization',
            'activation',
          ]}
        />
        <Wrapper py={5}>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
        </Wrapper>
      </Layout>
    )
  }
}

export default StaticPageTemplate
