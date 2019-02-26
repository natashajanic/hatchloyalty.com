import system from 'system-components'

const Panel = system(
  {
    border: '1px solid',
    borderColor: 'grayLight',
    borderRadius: 4,
    m: 0,
    p: 3,
    width: '100%',
    blacklist: ['cursor'],
  },
  {
    // boxShadow: 'rgba(153,153,153,0.50) 0 2px 4px ',
    // boxShadow: 'rgba(153,153,153,0.50) 0 3px 10px',
    // boxShadow: `${themeGet(grayLight 0 2px 4px)}`,
    boxShadow: '#dfdfdf 0 3px 10px',
  },
  (props: any) => ({
    cursor: props.cursor ? 'pointer' : 'auto',
    background: props.disabled ? 'grayLight' : props.background || 'white',
  }),
  'alignItems',
  'borderColor',
  'borderRadius',
  'display',
  'height',
  'flex',
  'flexDirection',
  'justifyContent',
  'position',
  'space',
  'width'
)

Panel.displayName = 'Panel'

Panel.Header = system(
  {
    is: 'header',
    alignItems: 'center',
    borderBottom: 1,
    borderColor: 'grayLight',
    display: 'flex',
    justifyContent: 'space-between',
    mx: -3,
    mb: 4,
    pb: 3,
    px: 3,
  },
  'alignItems',
  'flex',
  'flexDirection',
  'justifyContent'
)

Panel.Header.displayName = 'Panel.Header'

Panel.Title = system(
  {
    is: 'h4',
    color: 'offBlack',
    fontSize: 4,
    m: 0,
  },
  'alignItems',
  'display',
  'space'
)

Panel.Body = system(
  {
    is: 'div',
  },
  {
    maxHeight: '415px',
    overflow: 'scroll',
  }
)

Panel.Footer = system(
  {
    is: 'footer',
    alignItems: 'center',
    borderTop: 1,
    borderColor: 'grayLight',
    display: 'flex',
    justifyContent: 'space-between',
    mx: -3,
    mt: 4,
    pt: 3,
    px: 3,
  },
  'justifyContent'
)

Panel.Footer.displayName = 'Panel.Footer'

export default Panel
