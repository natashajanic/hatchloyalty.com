import { FluidObject } from 'gatsby-image'

export interface IBlogPost {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    author: string
    date: string
    featuredImage?: IGraphQLImage
    tags: string[]
    title: string
  }
  html: string
}

export interface IGraphQLImage {
  childImageSharp: {
    fluid: FluidObject
  }
}

export interface IRelease {
  changes: Array<{ component: string; description: string; link?: string }>
  date: string
  name: string
}

export interface IResourcePost {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
  html: string
}

export interface ITeamMember {
  headshot?: IGraphQLImage
  name: string
  position: string
}
