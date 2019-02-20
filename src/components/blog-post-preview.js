import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import system from 'system-components'
import Panel from './panel'
import Text from './text'

const BlogPostCard = system({
  is: Panel,
  px: 4,
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

class BlogPostPreview extends React.Component {
  render() {
    const {
      author,
      date,
      excerpt,
      featuredImage,
      slug,
      tags,
      title,
    } = this.props;

    const tagLinks = tags.map(tag =>
      <BlogPostTag key={`tagLink-${tag}`}>
        <Link to={`/blog/tags/${kebabCase(tag)}`}>{tag}</Link>
      </BlogPostTag>
    )

    return (
      <BlogPostCard
        key={slug}
      >
        <Link
          to={`/blog/${slug}`}
          style={{
            color: '#666666',
            display: 'block',
            textDecoration: 'none'
          }}
        >
          {title || slug}
        </Link>

        <BlogPostCardMeta>
          <span>Post Written by {author} on {date}</span><br />
          <span>Tags: {tagLinks}</span>
        </BlogPostCardMeta>

        {featuredImage && <Img fluid={featuredImage.childImageSharp.fluid} />}

        <Text
          is="p"
          color="grayDark"
          fontSize={3}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        <Link
          to={`/blog/${slug}`}
          color="grayDark"
        >
          Read More
        </Link>
      </BlogPostCard>
    )
  }
}

BlogPostPreview.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  featuredImage: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      fluid: PropTypes.shape({}),
    }),
  }),
  slug: PropTypes.string,
  tags: PropTypes.string,
  title: PropTypes.string,
}

export default BlogPostPreview
