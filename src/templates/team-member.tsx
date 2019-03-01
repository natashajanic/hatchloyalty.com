import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { kebabCase } from 'lodash'
import * as React from 'react'
import system from 'system-components'
import BlogPostContainer from 'src/components/blog-post-container'
import BlogPostPreview from 'src/components/blog-post-preview'
import Box from 'src/components/box'
import Layout from 'src/components/layout'
import Pager from 'src/components/pager'
import Text from 'src/components/text'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import ProfileDefault from 'src/images/profile-default.jpg'
import { IGraphQLImage } from 'src/models'

const TitleContainer = system({
  is: Box,
  mb: 4,
})

const ProfileContainer = system({
  is: Box,
  m: 4,
  textAlign: 'center',
})

const ProfileImageWrapper = system({
  is: Box,
  borderRadius: '100%',
  height: 100,
  mx: 'auto',
  my: 2,
  overflow: 'hidden',
  width: 100,
})

interface ITeamMemberTemplateProps {
  pageContext: {
    pageCount: number
    pageNum: number
    name: string
    totalCount: number
  }
  data: {
    allMarkdownRemark?: {
      edges: Array<{
        node: {
          excerpt: string
          fields: { slug: string }
          frontmatter: {
            date: string
            featuredImage?: IGraphQLImage
            tags: string[]
            title: string
          }
        }
      }>
    }
    allTeamMembersJson?: {
      edges: Array<{
        node: {
          name: string
          position: string
          headshot?: IGraphQLImage
        }
      }>
    }
  }
}

class TeamMemberTemplate extends React.Component<ITeamMemberTemplateProps, {}> {
  renderProfile() {
    const {
      pageContext: { name },
      data: { allTeamMembersJson },
    } = this.props

    const teamMember =
      allTeamMembersJson && allTeamMembersJson.edges.length > 0
        ? allTeamMembersJson.edges[0].node
        : undefined
    const profileImage =
      teamMember && teamMember.headshot ? (
        <Img fluid={teamMember.headshot.childImageSharp.fluid} />
      ) : (
        <img src={ProfileDefault} alt="" />
      )

    return (
      <ProfileContainer>
        <ProfileImageWrapper>{profileImage}</ProfileImageWrapper>
        <Text is="h1" fontSize={5}>
          {name}
        </Text>
        <Text fontSize={2}>{teamMember && teamMember.position}</Text>
      </ProfileContainer>
    )
  }

  renderBlogPosts() {
    const {
      pageContext: { pageCount, pageNum, name, totalCount },
      data: { allMarkdownRemark },
    } = this.props

    if (!allMarkdownRemark || allMarkdownRemark.edges.length === 0) {
      return null
    }

    const posts = allMarkdownRemark.edges.map(({ node }) => (
      <BlogPostPreview
        key={node.fields.slug}
        author={name}
        date={node.frontmatter.date}
        excerpt={node.excerpt}
        featuredImage={node.frontmatter.featuredImage}
        slug={node.fields.slug}
        tags={node.frontmatter.tags}
        title={node.frontmatter.title}
      />
    ))
    const postsDescription = `Showing ${posts.length} of ${totalCount} post${
      totalCount === 1 ? '' : 's'
    } by ${name}`
    const pager = (
      <Pager
        currentPage={pageNum}
        maxPage={pageCount}
        basePath={`/team/${kebabCase(name)}`}
      />
    )

    return (
      <BlogPostContainer is="main">
        <TitleContainer>
          <Text is="h3" fontSize={3}>
            {postsDescription}
          </Text>
        </TitleContainer>
        <Box>{posts}</Box>
        {pageCount > 1 && pager}
      </BlogPostContainer>
    )
  }

  render() {
    const {
      pageContext: { name },
    } = this.props
    return (
      <Layout pageStyle="offWhite">
        <SEO title={name} />
        <Wrapper>
          <Text fontSize={2} m={2}>
            <Link to="/team">View all Team Members</Link>
          </Text>
          {this.renderProfile()}
          {this.renderBlogPosts()}
        </Wrapper>
      </Layout>
    )
  }
}

export default TeamMemberTemplate

export const pageQuery = graphql`
  query($name: String, $pageOffset: Int, $pageSize: Int) {
    allMarkdownRemark(
      limit: $pageSize
      skip: $pageOffset
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { sourceName: { eq: "blog" } }
        frontmatter: { author: { eq: $name } }
      }
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
    allTeamMembersJson(filter: { name: { eq: $name } }) {
      edges {
        node {
          name
          position
          headshot {
            childImageSharp {
              fluid(maxWidth: 250) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
