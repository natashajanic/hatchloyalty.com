import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import * as React from 'react'
import BlogPostList from 'src/components/blog-post-list'
import Layout from 'src/components/layout'
import TeamMemberProfile from 'src/components/team-member-profile'
import Text from 'src/components/text'
import SEO from 'src/components/seo'
import Wrapper from 'src/components/wrapper'
import { IBlogPost, ITeamMember } from 'src/models'

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
        node: IBlogPost
      }>
    }
    allTeamMembersJson?: {
      edges: Array<{
        node: ITeamMember
      }>
    }
  }
}

class TeamMemberTemplate extends React.Component<ITeamMemberTemplateProps, {}> {
  render() {
    const {
      pageContext: { pageCount, pageNum, name, totalCount },
      data: { allMarkdownRemark, allTeamMembersJson },
    } = this.props

    let teamMember: ITeamMember | undefined
    if (allTeamMembersJson && allTeamMembersJson.edges.length > 0) {
      teamMember = allTeamMembersJson.edges[0].node
    }

    let posts: IBlogPost[] = []
    if (allMarkdownRemark && allMarkdownRemark.edges.length > 0) {
      posts = allMarkdownRemark.edges.map(edge => edge.node)
    }

    return (
      <Layout pageStyle="offWhite">
        <SEO title={name} />
        <Wrapper>
          <Text fontSize={2} m={2} textAlign="right">
            <Link to="/team">View all Team Members</Link>
          </Text>

          {teamMember && <TeamMemberProfile teamMember={teamMember} />}

          <BlogPostList
            basePath={`/team/${kebabCase(name)}`}
            descriptionSuffix={`by ${name}`}
            pageCount={pageCount}
            pageNum={pageNum}
            posts={posts}
            totalCount={totalCount}
          />
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
            author
            date(formatString: "MMMM DD, YYYY")
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
            tags
            title
          }
          html
        }
      }
    }
    allTeamMembersJson(filter: { name: { eq: $name } }) {
      edges {
        node {
          headshot {
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          name
          position
        }
      }
    }
  }
`
