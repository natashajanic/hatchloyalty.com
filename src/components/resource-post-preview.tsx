import { Link } from 'gatsby'
import * as React from 'react'
import Text from 'src/components/text'
import { IResourcePost } from 'src/models'

export interface IResourcePostPreviewProps {
  post: IResourcePost
}

class ResourcePostPreview extends React.Component<
  IResourcePostPreviewProps,
  {}
> {
  render() {
    const { post } = this.props

    return (
      <div>
        <Link
          to={`/resource${post.fields.slug}`}
          style={{
            color: '#666666',
            display: 'block',
            textDecoration: 'none',
          }}
        >
          {post.frontmatter.title}
        </Link>

        <Text
          is="p"
          color="grayDark"
          fontSize={3}
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        <Link to={`/resource${post.fields.slug}`} color="grayDark">
          Read More
        </Link>
      </div>
    )
  }
}

export default ResourcePostPreview
