import * as React from 'react'
import BlogPostPreview from 'src/components/blog-post-preview'
import Pager from 'src/components/pager'
import PostListWrapper from 'src/components/post-list-wrapper'
import Text from 'src/components/text'
import { IBlogPost } from 'src/models'

export interface IBlogPostListProps {
  basePath: string
  descriptionSuffix?: string
  pageCount: number
  pageNum: number
  posts: IBlogPost[]
  totalCount: number
}

class BlogPostList extends React.Component<IBlogPostListProps, {}> {
  render() {
    const {
      basePath,
      descriptionSuffix,
      pageCount,
      pageNum,
      posts,
      totalCount,
    } = this.props

    if (posts.length === 0) {
      return null
    }

    const postElements = posts.map(post => (
      <BlogPostPreview key={post.fields.slug} post={post} />
    ))
    const pageDescription =
      `Showing ${posts.length} of ${totalCount}` +
      ` post${totalCount === 1 ? '' : 's'} ${
        descriptionSuffix ? descriptionSuffix : ''
      }`

    return (
      <PostListWrapper>
        <Text is="h2" fontSize={4} mt={4} mb={2}>
          {pageDescription}
        </Text>
        {postElements}
        {pageCount > 1 && (
          <Pager
            basePath={basePath}
            currentPage={pageNum}
            maxPage={pageCount}
          />
        )}
      </PostListWrapper>
    )
  }
}

export default BlogPostList
