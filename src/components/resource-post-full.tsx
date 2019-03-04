import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import { IResourcePost } from 'src/models'

const PostTitle = system({
  is: 'h1',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  fontSize: 5,
  m: 0,
  pb: 4,
})

export interface IResourcePostFullProps {
  post: IResourcePost
}

class ResourcePostFull extends React.Component<IResourcePostFullProps, {}> {
  render() {
    const { post } = this.props

    return (
      <div>
        <Box py={4}>
          <PostTitle>{post.frontmatter.title}</PostTitle>
        </Box>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default ResourcePostFull
