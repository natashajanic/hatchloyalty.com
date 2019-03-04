import * as React from 'react'
import PostListWrapper from 'src/components/post-list-wrapper'
import ResourcePostPreview from 'src/components/resource-post-preview'
import { IResourcePost } from 'src/models'

export interface IResourcePostListProps {
  posts: IResourcePost[]
}

class ResourcePostList extends React.Component<IResourcePostListProps, {}> {
  render() {
    const { posts } = this.props

    const postElements = posts.map(post => (
      <ResourcePostPreview key={post.fields.slug} post={post} />
    ))

    return <PostListWrapper>{postElements}</PostListWrapper>
  }
}

export default ResourcePostList
