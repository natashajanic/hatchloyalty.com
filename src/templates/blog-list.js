import React from 'react'
import { graphql } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import { BookOpen } from 'react-feather'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Text from '../components/text'
import Box from '../components/box'
import Wrapper from '../components/wrapper'
import BlogPostPreview from '../components/blog-post-preview';
import IconCircle from '../components/icon-circle'
import Pager from '../components/pager';

class BlogListTemplate extends React.Component {
  render() {
    const {
      pageContext: { pageCount, pageNum, totalCount },
      data: {
        posts: { edges: posts },
      }
    } = this.props;
    const pageDescription = `Showing ${posts.length} of ${totalCount}
      post${totalCount === 1 ? "" : "s"}`

    return (
      <Layout pageStyle="white">
        <SEO title="All Posts" keywords={['hatch', 'hatch loyalty', 'loyalty', 'blog', 'personalization', 'activation',]} />
        <Wrapper>
          <Box
            alignItems="center"
            display="flex"
            py={4}
          >
            <IconCircle bg="green">
              <BookOpen size={20} color="#fff" />
            </IconCircle>
            <Text fontSize={1} ml={2}>Hatch Insights</Text>
          </Box>

          <Text is="h2" fontSize={5}>Learn from experts. Hatch is here to help you build stronger relationships with your customers.</Text>

          <Text is="h2" fontSize={4} mt={4} mb={2}>{pageDescription}</Text>
          {posts.map(({ node }) => (
            <BlogPostPreview
              key={kebabCase(node.fields.slug)}
              author={node.frontmatter.author}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
              featuredImage={node.frontmatter.featuredImage}
              slug={node.fields.slug}
              tags={node.frontmatter.tags}
              title={node.frontmatter.title}
            />
          ))}
          {(pageCount > 1) && <Pager
            currentPage={pageNum}
            maxPage={pageCount}
            basePath={`/blog`}
          />}
        </Wrapper>
      </Layout>
    )
  }
}

export default BlogListTemplate

export const pageQuery = graphql`
  query($pageOffset: Int, $pageSize: Int) {
    posts: allMarkdownRemark(
      limit: $pageSize
      skip: $pageOffset
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceName: { eq: "blog"}}},
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            tags
            featuredImage {
              childImageSharp {
                resize(width: 1500, height: 1500) {
                  src
                }
                fluid(maxWidth: 786) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
