const path = require('path')
const { paginateList } = require('./helpers')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const blogListTemplate = path.resolve('./src/templates/blog-list.tsx')
  const blogTemplate = path.resolve('./src/templates/blog.tsx')

  graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: {fields: {sourceName: {eq: "blog"}}}
        ) {
          totalCount
          edges {
            node {
              fields {
                slug
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

    const { data: { allMarkdownRemark } } = result
    paginateList(allMarkdownRemark, createPage, blogListTemplate, '/blog')

    allMarkdownRemark.edges.forEach(post => {
      createPage({
        path: `/blog${post.node.fields.slug}`,
        component: blogTemplate,
        context: {
          slug: post.node.fields.slug,
          title: post.node.frontmatter.title
        },
      })
    })

    resolve()
  })
})
