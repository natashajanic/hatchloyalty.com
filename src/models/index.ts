import { FluidObject } from 'gatsby-image'

export interface IRelease {
  changes: Array<{ component: string; description: string; link?: string }>
  date: string
  name: string
}

export interface IGraphQLImage {
  childImageSharp: {
    fluid: FluidObject
  }
}
