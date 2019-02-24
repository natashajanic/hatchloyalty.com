import * as React from 'react'
import system from 'system-components'

const UIFooter = system({
  is: 'footer',
  alignItems: 'center',
  bg: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  mx: 'auto',
  px: 3,
  py: 3,
  width: '1024px',
})

class Footer extends React.Component<{}, {}> {
  render() {
    return <UIFooter>Footer</UIFooter>
  }
}

export default Footer
