const path = require('path')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const pageTemplate = path.resolve('./src/templates/static-page.tsx')

  graphql(
    `
      {
        allMarkdownRemark(
          filter: { fields: { sourceName: { eq: "staticPages" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
              html
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

    const { data: { allMarkdownRemark: { edges } } } = result
    edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: pageTemplate,
        context: {
          page: edge.node,
        },
      })
    })

    resolve()
  })
})
