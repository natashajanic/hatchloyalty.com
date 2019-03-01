import system from 'system-components'

const Badge = system(
  {
    alignItems: 'center',
    background: 'greenXLight',
    border: '1px solid',
    borderColor: 'green',
    borderRadius: '10%',
    color: 'green',
    display: 'flex',
    fontSize: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    mx: 2,
    px: 2,
  },
  (props: any) => ({
    textTransform: 'uppercase',
  }),
  'alignItems',
  'border',
  'borderColor',
  'borderBottom',
  'borderRadius',
  'color',
  'display',
  'justifyContent',
  'space',
  'width'
)

export default Badge
