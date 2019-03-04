const _ = require('lodash')
const path = require('path')
const { paginateList } = require('./helpers')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const teamMemberTemplate = path.resolve('./src/templates/team-member.tsx')

  graphql(
    `
      {
        teamMembers: allTeamMembersJson {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const { data: { teamMembers: { edges } } } = result

    // Make each team member's pages
    const teamMemberPagesCreation = edges.map(edge => (
      new Promise((teamMemberPageResolve, teamMemberPageReject) => {
        const teamMemberName = edge.node.name

        graphql(
          `
            query($author: String) {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                filter: {
                  fields: { sourceName: { eq: "blog" } }
                  frontmatter: { author: { eq: $author } }
                }
              ) {
                totalCount
                edges {
                  node {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `,
          { author: teamMemberName }
        ).then(teamMemberPageResult => {
          if (teamMemberPageResult.errors) {
            console.log(teamMemberPageResult.errors)
            teamMemberPageReject(teamMemberPageResult.errors)
          }

          const { data: { allMarkdownRemark } } = teamMemberPageResult
          const teamMemberPath = `/team/${_.kebabCase(teamMemberName)}`

          if (allMarkdownRemark && allMarkdownRemark.edges && allMarkdownRemark.edges.length > 0) {
            paginateList(
              allMarkdownRemark,
              createPage,
              teamMemberTemplate,
              teamMemberPath,
              { name: teamMemberName }
            )
          } else {
            createPage({
              path: teamMemberPath,
              component: teamMemberTemplate,
              context: { name: teamMemberName },
            })
          }

          teamMemberPageResolve()
        })
      })
    ))

    Promise.all(teamMemberPagesCreation).then(resolve)
  })
})
