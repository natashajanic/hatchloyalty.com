import * as React from 'react'
import Box from 'src/components/box'
import Text from 'src/components/text'

class ChangelogIntro extends React.Component<{}, {}> {
  render() {
    return (
      <Box mx="auto" my={5} px={6} width="80%">
        <Text color="green" fontSize={8} textAlign="center">
          Hatch Changelog
        </Text>
        <Text fontSize={4} mb={3} textAlign="center">
          Check out what's new! Below is a list of new features, improvements,
          and bug fixes organized by monthly release.
        </Text>
        <Box style={{ textAlign: 'center' }}>
          <button>Email for Updates</button>
        </Box>
      </Box>
    )
  }
}

export default ChangelogIntro
