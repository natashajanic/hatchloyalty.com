/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const _ = require("lodash")
const { createFilePath } = require('gatsby-source-filesystem')

const paginatePosts = (postsDetails, createPage, template, basePath, context = {}) => {
  const postsPerPage = 10
  const numPages = Math.ceil(postsDetails.edges.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_element, i) => {
    createPage({
      path: i === 0 ? basePath : `${basePath}/${i + 1}`,
      component: template,
      context: {
        pageCount: numPages,
        pageNum: (i + 1),
        pageOffset: i * postsPerPage,
        pageSize: postsPerPage,
        totalCount: postsDetails.totalCount,
        ...context,
      },
    })
  })
}

const createBlogPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const blogListTemplate = path.resolve('./src/templates/blog-list.js')
  const blogTemplate = path.resolve('./src/templates/blog.js')

  graphql(
    `
      {
        allMarkdownRemark(sort: {
          fields: [frontmatter___date], order: DESC },
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

    const { data: { allMarkdownRemark: { edges } } } = result
    edges.forEach((resource) => {
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
              allMarkdownRemark(
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

          const { data: { allMarkdownRemark } } = result
          paginatePosts(allMarkdownRemark, createPage, tagTemplate, `/tags/${_.kebabCase(tag)}`, { tag })

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