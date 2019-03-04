import * as React from 'react'
import Layout from 'src/components/layout'
import Release from 'src/components/release'
import ReleaseNavigation from 'src/components/release-navigation'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import { IRelease } from 'src/models'

export interface IReleaseTemplateProps {
  pageContext: {
    release: IRelease
    previous: IRelease
    next: IRelease
  }
}

class ReleaseTemplate extends React.Component<IReleaseTemplateProps, {}> {
  render() {
    const {
      pageContext: { release, previous, next },
    } = this.props

    return (
      <Layout pageStyle="offWhite">
        <SEO
          title="Changelog"
          keywords={[
            'hatch',
            'hatch loyalty',
            'loyalty',
            'blog',
            'personalization',
            'activation',
            'changelog',
          ]}
        />
        <Wrapper>
          <ReleaseNavigation next={next} previous={previous} />

          <Release release={release} />
        </Wrapper>
      </Layout>
    )
  }
}

export default ReleaseTemplate
