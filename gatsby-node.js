/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require('gatsby-source-filesystem')

const { createPages: createBlogPages } = require('./config/blogs-setup')
const { createPages: createReleasesPages } = require('./config/releases-setup')
const { createPages: createResourcePages } = require('./config/resources-setup')
const { createPages: createTagPages } = require('./config/tags-setup')
const { createPages: createTeamPages } = require('./config/team-setup')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const setupSteps = []

  setupSteps.push(createBlogPages(graphql, createPage))
  setupSteps.push(createReleasesPages(graphql, createPage))
  setupSteps.push(createResourcePages(graphql, createPage))
  setupSteps.push(createTagPages(graphql, createPage))
  setupSteps.push(createTeamPages(graphql, createPage))

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