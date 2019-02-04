module.exports = {
  siteMetadata: {
    title: 'Hatch Loyalty',
    description: 'Hatch Loyalty is modern customer activation platform that powers personalization for retailers across many different verticals.',
    author: '@hatchloyalty',
    social: {
      twitter: '@hihatch'
    },
    navLinks: [
      {
        name: 'home',
        link: '/',
      },
      {
        name: 'features',
        link: '/features',
      },
      {
        name: 'docs',
        link: '/docs',
      },
      {
        name: 'blog',
        link: '/blog',
      },
    ]
  },
  // mapping: {
  //   "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  // },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/docs`,
        name: 'docs',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `featuredImage`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
  ],
}
