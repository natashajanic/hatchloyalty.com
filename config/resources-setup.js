const path = require('path')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const resourceTemplate = path.resolve('./src/templates/resource.tsx')

  graphql(
    `
      {
        allMarkdownRemark(sort: {
          fields: [frontmatter___date], order: DESC },
          limit: 1000
          filter: {fields: {sourceName: {eq: "resources"}}}
        ) {
          edges {
            node {
              fields {
                slug
              }
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
        path: `/resource${edge.node.fields.slug}`,
        component: resourceTemplate,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })

    resolve()
  })
})
