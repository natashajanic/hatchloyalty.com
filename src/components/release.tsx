import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Badge from 'src/components/badge'
import Box from 'src/components/box'
import Flex from 'src/components/flex'
import Panel from 'src/components/panel'
import Text from 'src/components/text'
import { IRelease } from 'src/models'

const ReleaseRowWrapper = system({
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  p: 3,
})

export interface IReleaseProps {
  release: IRelease
}

class Release extends React.Component<IReleaseProps, {}> {
  renderTitle() {
    const { release } = this.props
    const releasePath = `/releases/${kebabCase(release.name)}`

    let title: string | React.ReactElement = release.name
    if (
      typeof window === 'undefined' ||
      !window.location.pathname.startsWith(releasePath)
    ) {
      title = <Link to={releasePath}>{release.name}</Link>
    }

    return (
      <Text as="h3" my={1} textAlign="center">
        {title}
      </Text>
    )
  }
  render() {
    const { release } = this.props

    const changesList = release.changes.map((change, index) => (
      <ReleaseRowWrapper key={`change-${index}`}>
        <Flex alignItems="flex-start">
          <Flex justifyContent="flex-end" width={120}>
            <Badge>{change.component}</Badge>
          </Flex>
          <Box ml={2} style={{ flex: '1 1 0%' }}>
            <Text fontSize={3}>{change.description}</Text>
            {change.link && (
              <Link to={change.link}>
                <Text fontSize={3}>Click to read more</Text>
              </Link>
            )}
          </Box>
        </Flex>
      </ReleaseRowWrapper>
    ))

    return (
      <Panel mb={5} mt={3} p={0}>
        <ReleaseRowWrapper>{this.renderTitle()}</ReleaseRowWrapper>
        {changesList}
      </Panel>
    )
  }
}

export default Release
