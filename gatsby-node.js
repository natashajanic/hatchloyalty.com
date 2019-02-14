/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const _ = require("lodash")
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve('./src/templates/blog.js')
    // const tagTemplate = path.resolve("src/templates/tags.js")
    const resourceTemplate = path.resolve('./src/templates/resources.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: {
              fields: [frontmatter___date], order: DESC },
              limit: 1000) {
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

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges.filter((edge) => {
          const sourceName = edge.node.fields.sourceName
          if (sourceName === 'blog' ) {
            return edge
          }
        })

        posts.forEach((post, index) => {

          const previous = index === result.data.allMarkdownRemark.edges.length - 1 ? null : result.data.allMarkdownRemark.edges[index + 1].node;
          const next = index === 0 ? null : result.data.allMarkdownRemark.edges[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create resource pages
        const resources = result.data.allMarkdownRemark.edges.filter((edge) => {
          const sourceName = edge.node.fields.sourceName
          if (sourceName === 'resources' ) {
            return edge
          }
        })

        resources.forEach((resource) => {
          createPage({
            path: resource.node.fields.slug,
            component: resourceTemplate,
            context: {
              slug: resource.node.fields.slug,
            },
          })
        })

        // Tag pages:
        // let tags = []
        // // Iterate through each post, putting all found tags into `tags`
        // _.each(posts, edge => {
        //   if (_.get(edge, "node.frontmatter.tags")) {
        //     tags = tags.concat(edge.node.frontmatter.tags)
        //   }
        // })
        // // Eliminate duplicate tags
        // tags = _.uniq(tags)

        // // Make tag pages
        // tags.forEach(tag => {
        //   createPage({
        //     path: `/tags/${_.kebabCase(tag)}/`,
        //     component: tagTemplate,
        //     context: {
        //       tag,
        //     },
        //   })
        // })

        // // Create resource pages
        // const resources = result.data.allMarkdownRemark.edges;

        // resources.forEach((resource) => {
        //   createPage({
        //     path: resource.node.fields.slug,
        //     component: resourceTemplate,
        //     context: {
        //       slug: resource.node.fields.slug,
        //     }
        //   })
        // })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}