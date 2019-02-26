const path = require('path')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const resourceTemplate = path.resolve('./src/templates/resources.tsx')

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
                sourceName
              }
              frontmatter {
                title
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
    edges.forEach(resource => {
      createPage({
        path: `/resource${resource.node.fields.slug}`,
        component: resourceTemplate,
        context: {
          slug: resource.node.fields.slug,
        },
      })
    })

    resolve()
  })
})
