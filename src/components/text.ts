import system from 'system-components'

const Text = system(
  {
    fontSize: 3,
    lineHeight: '1.5',
    m: 0,
    textStyle: 'normal',
  },
  (props: any) => ({
    overflow: props.truncate ? 'hidden' : null,
    textOverflow: props.truncate ? 'ellipsis' : null,
    whiteSpace: props.truncate ? 'nowrap' : null,
  }),
  'alignItems',
  'color',
  'display',
  'flex',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'space',
  'textStyle',
  'textAlign'
)

Text.displayName = 'Text'

export default Text
