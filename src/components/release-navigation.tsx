import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import { IRelease } from 'src/models'

const NavigationWrapper = system({
  fontSize: 3,
  my: 3,
  textAlign: 'center',
})

export interface IReleaseNavigationProps {
  next?: IRelease
  previous?: IRelease
}

class ReleaseNavigation extends React.Component<IReleaseNavigationProps, {}> {
  render() {
    const { next, previous } = this.props

    return (
      <NavigationWrapper>
        <Box width={200} style={{ float: 'left', textAlign: 'left' }}>
          {previous && (
            <Link to={`/releases/${kebabCase(previous.name)}`}>
              Previous: {previous.name}
            </Link>
          )}
          &nbsp;
        </Box>
        <Box display="inline-block">
          <Link to={'/releases'}>View All Releases</Link>
        </Box>
        <Box width={200} style={{ float: 'right', textAlign: 'right' }}>
          &nbsp;
          {next && (
            <Link to={`/releases/${kebabCase(next.name)}`}>
              Next: {next.name}
            </Link>
          )}
        </Box>
      </NavigationWrapper>
    )
  }
}

export default ReleaseNavigation
