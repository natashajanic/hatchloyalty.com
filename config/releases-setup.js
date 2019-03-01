const _ = require('lodash')
const path = require('path')
const { paginateList } = require('./helpers')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const releaseListTemplate = path.resolve('./src/templates/release-list.tsx')
  const releaseTemplate = path.resolve('./src/templates/release.tsx')

  graphql(
    `
      {
        releases: allReleasesJson(
          sort: { fields: date, order: DESC }
        ) {
          totalCount
          edges {
            node {
              changes {
                component
                description
                link
              }
              date
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

    const { data: { releases } } = result
    paginateList(releases, createPage, releaseListTemplate, '/releases')

    const { edges } = releases
    edges.forEach((edge, index) => {
      const release = edge.node
      const previous = index === edges.length - 1 ? null : edges[index + 1].node
      const next = index === 0 ? null : edges[index - 1].node

      createPage({
        path: `/releases/${_.kebabCase(release.name)}`,
        component: releaseTemplate,
        context: {
          release,
          previous,
          next,
        },
      })
    })

    resolve()
  })
})
