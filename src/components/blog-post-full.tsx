import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Box from 'src/components/box'
import { IBlogPost } from 'src/models'

const PostTitle = system({
  is: 'h1',
  borderBottom: '1px solid',
  borderColor: 'grayLight',
  fontSize: 5,
  m: 0,
  pb: 4,
})

const TagLink = system({
  is: 'span',
  mx: 1,
})

export interface IBlogPostFullProps {
  post: IBlogPost
}

class BlogPostFull extends React.Component<IBlogPostFullProps, {}> {
  render() {
    const { post } = this.props

    const tagLinks = post.frontmatter.tags.map(tag => (
      <TagLink key={`tagLink-${tag}`}>
        <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
      </TagLink>
    ))

    return (
      <div>
        <Box py={4}>
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <div>
            Written by{' '}
            <Link to={`/team/${kebabCase(post.frontmatter.author)}`}>
              {post.frontmatter.author}
            </Link>
            &nbsp;on {post.frontmatter.date}
          </div>
          <div>Tags: {tagLinks}</div>
        </Box>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default BlogPostFull
