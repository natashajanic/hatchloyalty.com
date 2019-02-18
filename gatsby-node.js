/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const _ = require("lodash")
const { createFilePath } = require('gatsby-source-filesystem')

const createBlogPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const blogTemplate = path.resolve('./src/templates/blog.js')

  graphql(
    `
      {
        allMarkdownRemark(sort: {
          fields: [frontmatter___date], order: DESC },
          limit: 1000
          filter: {fields: {sourceName: {eq: "blog"}}}
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

    const posts = result.data.allMarkdownRemark.edges
    posts.forEach((post, index) => {

      const previous = index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;

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

    resolve()
  })
})

const createResourcePages = (graphql, createPage) => new Promise((resolve, reject) => {
  const resourceTemplate = path.resolve('./src/templates/resources.js')

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

    const resources = result.data.allMarkdownRemark.edges;
    resources.forEach((resource) => {
      createPage({
        path: resource.node.fields.slug,
        component: resourceTemplate,
        context: {
          slug: resource.node.fields.slug,
        },
      })
    })

    resolve()
  })
})

const createTagPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const tagTemplate = path.resolve('./src/templates/tag.js')

  graphql(
    `
      {
        allMarkdownRemark(
          limit: 2000
          filter: {fields: {sourceName: {eq: "blog"}}}
        ) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    let tags = result.data.allMarkdownRemark.group.map(edge => edge.fieldValue)

    // Make each tag's pages
    const tagPagesCreation = tags.map(tag => (
      new Promise((resolve, reject) => {
        graphql(
          `
            query($tag: String) {
              posts: allMarkdownRemark(
                limit: 2000
                sort: { fields: [frontmatter___date], order: DESC }
                filter: { frontmatter: { tags: { in: [$tag] } } }
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
          { tag }
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const { data: { posts: { totalCount, edges } } } = result

          const postsPerPage = 10
          const numPages = Math.ceil(edges.length / postsPerPage)
          Array.from({ length: numPages }).forEach((_element, i) => {
            createPage({
              path: i === 0 ? `/tags/${_.kebabCase(tag)}` : `/tags/${_.kebabCase(tag)}/${i + 1}`,
              component: tagTemplate,
              context: {
                pageCount: numPages,
                pageNum: (i + 1),
                pageOffset: i * postsPerPage,
                pageSize: postsPerPage,
                tag,
                totalCount,
              },
            })
          })

          resolve()
        })
      })
    ))

    Promise.all(tagPagesCreation).then(resolve)
  })
})

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const setupSteps = []

  setupSteps.push(createBlogPages(graphql, createPage))
  setupSteps.push(createResourcePages(graphql, createPage))
  setupSteps.push(createTagPages(graphql, createPage))

  return Promise.all(setupSteps)
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