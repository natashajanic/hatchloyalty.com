const path = require('path')
const { paginatePosts } = require('./helpers')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const blogListTemplate = path.resolve('./src/templates/blog-list.tsx')
  const blogTemplate = path.resolve('./src/templates/blog.tsx')

  graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC },
          limit: 1000
          filter: {fields: {sourceName: {eq: "blog"}}}
        ) {
          totalCount
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

    const { data: { allMarkdownRemark } } = result
    paginatePosts(allMarkdownRemark, createPage, blogListTemplate, '/blog')

    const { edges } = allMarkdownRemark
    edges.forEach((post, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node;
      const next = index === 0 ? null : edges[index - 1].node;

      createPage({
        path: `/blog${post.node.fields.slug}`,
        component: blogTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    resolve()
  })
})
