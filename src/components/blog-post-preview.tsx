import { Link } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import Panel from './panel'
import Box from './Box'
import Text from './text'

const BlogPostCard = system({
  is: 'article',
  py: 5,
  mb: 4,
})

const BlogPostCardMeta = system({
  is: 'div',
  color: 'grayDark',
  fontSize: 1,
})

const BlogPostTag = system({
  is: 'span',
  mx: 1,
})

export interface IBlogPostPreviewProps {
  author: string
  date: string
  excerpt: string
  featuredImage?: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  slug: string
  tags: string[]
  title: string
}

class BlogPostPreview extends React.Component<IBlogPostPreviewProps, {}> {
  render() {
    const {
      author,
      date,
      excerpt,
      featuredImage,
      slug,
      tags,
      title,
    } = this.props

    const tagLinks = tags.map(tag => (
      <BlogPostTag key={`tagLink-${tag}`}>
        <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
      </BlogPostTag>
    ))

    return (
<<<<<<< HEAD:src/components/blog-post-preview.js
      <BlogPostCard
        key={slug}
      >
        <span>Tags: {tagLinks}</span>
=======
      <BlogPostCard key={slug}>
>>>>>>> 0d95e86ce72268dcf9369c315bc295f784ae3a34:src/components/blog-post-preview.tsx
        <Link
          to={`/blog${slug}`}
          style={{ color: '#666666', display: 'block', textDecoration: 'none' }}
        >
          {title}
        </Link>

        <BlogPostCardMeta>
<<<<<<< HEAD:src/components/blog-post-preview.js
          <span>Post Written by {author} on {date}</span><br />
=======
          <span>
            Post Written by {author} on {date}
          </span>
          <br />
          <span>Tags: {tagLinks}</span>
>>>>>>> 0d95e86ce72268dcf9369c315bc295f784ae3a34:src/components/blog-post-preview.tsx
        </BlogPostCardMeta>

        <Box
          display="flex"
        >
          <Box
            width="40%"
          >
            {featuredImage && <Img fluid={featuredImage.childImageSharp.fluid} />}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            px={4}
            width="60%"
          >
            <Text
              is="p"
              color="grayDark"
              fontSize={3}
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />

<<<<<<< HEAD:src/components/blog-post-preview.js
            <Link
              to={`/blog/${slug}`}
              color="grayDark"
            >
              Read More
            </Link>
          </Box>
        </Box>
=======
        <Link to={`/blog${slug}`} color="grayDark">
          Read More
        </Link>
>>>>>>> 0d95e86ce72268dcf9369c315bc295f784ae3a34:src/components/blog-post-preview.tsx
      </BlogPostCard>
    )
  }
}

export default BlogPostPreview
