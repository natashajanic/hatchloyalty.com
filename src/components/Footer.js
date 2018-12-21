import React from 'react'
import system from 'system-components'

const UIFooter = system({
  is: 'footer',
  alignItems: 'center',
  bg: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  px: 3,
  py: 3,
})


const Footer = () => (
  <UIFooter>
    Footer
  </UIFooter>
)


export default Footer
