import { FluidObject } from 'gatsby-image'

export interface IGraphQLImage {
  childImageSharp: {
    fluid: FluidObject
  }
}
