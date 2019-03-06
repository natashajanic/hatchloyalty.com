const remarkPlugins = [
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 600,
    },
  },
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      aliases: {
        shell: "bash"
      },
      noInlineHighlight: true,
    },
  },
]

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
        name: 'resources',
        link: '/resources',
      },
      {
        name: 'blog',
        link: '/blog',
      },
    ]
  },

  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'releases',
        path: `${__dirname}/content/releases`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'staticPages',
        path: `${__dirname}/content/static-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'teamMembers',
        path: `${__dirname}/content/team-members`,
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
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: remarkPlugins,
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: remarkPlugins,
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
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-root-import',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-typescript`,
    'gatsby-remark-source-name',
  ],
}
