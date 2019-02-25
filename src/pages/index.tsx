import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'src/components/layout'
import SEO from 'src/components/seo'
import Box from 'src/components/box'
import Wrapper from 'src/components/wrapper'
import HatchWeb from 'src/images/hatch-web.svg'
import ActiveCampaignForm from 'src/components/active-campaign-form'

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          excerpt: string
          fields: { slug: string }
          frontmatter: {
            title: string
          }
        }
      }>
    }
  }
}

class IndexPage extends React.Component<IndexPageProps, {}> {
  render() {
    const { data } = this.props
    const keywords = [
      'hatch',
      'hatch loyalty',
      'loyalty',
      'personalization',
      'activation',
      'data',
      'platform',
      'security',
      'reliable',
    ]
    const featuredPosts = data.allMarkdownRemark.edges.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <Box key={node.fields.slug}>
          <h3>{title}</h3>
          <p>{node.excerpt}</p>
        </Box>
      )
    })

    return (
      <Layout>
        <SEO title="Home" keywords={keywords} />
        <Wrapper is="article" py={5}>
          <h2>Goodbye, traditional loyalty. Hello, Hatch.</h2>
          <h3>
            Technology designed to help you build stronger, more personal
            relationships with your customers.
          </h3>
          <Link to="/features">Learn More</Link>

          <section>
            <h3>Our Approach</h3>
            <h4>A modern platform for the modern organization.</h4>
            <div>
              <Box>
                <h4>Build</h4>
                <p>
                  Designing the perfect loyalty program is overwhelming. With
                  Hatch, you don’t have to figure out all of the bells &amp;
                  whistles today. Start small and iterate toward the best
                  program for your business.
                </p>
              </Box>

              <Box>
                <h4>Measure</h4>
                <p>
                  Good loyalty programs leverage member data to make more
                  informed decisions. With Hatch, the best programs can
                  understand engagement and make those decisions in real-time.
                </p>
              </Box>

              <Box>
                <h4>Learn</h4>
                <p>
                  Build a real-time feedback loop with your members. With Hatch,
                  access actionable insights that can be used to drive
                  engagement and change customer behavior
                </p>
              </Box>

              <Link to="/features">How it Works</Link>
            </div>
          </section>

          <section>
            <Box>
              <h3>Why we're differnt</h3>
              <h4>Open, Agile, Extensible</h4>
              <p>
                Traditional loyalty programs are overly complicated, inflexible,
                and expensive. Hatch's platform approach to loyalty is designed
                to integrate with existing systems, products, and partners. Let
                us help you get to market faster and cheaper while still
                providing the flexibility to adapt into the future.
              </p>
            </Box>
            <Box>
              <img src={HatchWeb} alt="" />
            </Box>
          </section>

          <section>
            <div>
              <Box>
                <h4>Flexible</h4>
                <p>
                  Hatch provides a simple API and a robust set of tools, giving
                  you the control necessary to build the program your customers
                  deserve.
                </p>
              </Box>

              <Box>
                <h4>Scalable</h4>
                <p>
                  Hatch is built to grow with your business. Whether it's one
                  location or thousands, Hatch dynamically scales with your
                  traffic.
                </p>
              </Box>

              <Box>
                <h4>Reliable</h4>
                <p>
                  We take pride in our platform, which is extensively tested and
                  monitored to ensure your program is always up and running.
                </p>
              </Box>

              <Box>
                <h4>Portable</h4>
                <p>
                  Access to your data when and where you need it most. Hatch
                  securely collects and shares data with your business in
                  real-time.
                </p>
              </Box>
            </div>

            <div>
              <Box>
                <h3>Developer Friendly</h3>
                <h4>Technology you can trust</h4>
                <p>
                  Hatch’s cloud-based platform provides you with best in class
                  security and an unmatched ability to scale. We care about the
                  developer experience. Leave your worries in our hands and
                  focus on your bottom line -- we’ve got you covered.
                </p>
                <ul>
                  <li>Extensive Documentation</li>
                  <li>Data Extracts</li>
                  <li>Webhooks</li>
                  <li>Test Environments</li>
                  <li>Isolated Runtimes</li>
                  <li>Enterprise-Grade Support</li>
                </ul>
                <a href="https://developer.hatchloyalty.com">
                  Explore Documentation
                </a>
              </Box>
            </div>
          </section>

          <section>
            <h3>Designed for Integration</h3>
            <h4>Use the best tool for the job</h4>
            <p>
              Avoid legacy lock-in. Hatch is designed to easily integrate with
              existing business systems and complimentary products &amp;
              services, giving you the flexibility and control to build the best
              solution for your business.
            </p>
            <Link to="/features">Learn More</Link>
          </section>

          <section>
            <h3>Our Blog</h3>
            <h4>
              Learn How Hatch Is Changing the Way Companies Approach Loyalty and
              Customer Engagment
            </h4>

            {featuredPosts}
          </section>

          <section>
            <blockquote>
              “Hatch is a robust, but easy to integrate customer loyalty
              platform that enables retailers to better understand and
              incentivize their customers…allowing them to engage their
              customers and grow their sales in a meaningful way.”
              <cite>Jeff Jordan General Partner, Andreessen Horowitz</cite>
            </blockquote>
          </section>

          <section>
            <h3>Try the Hatch Platform!</h3>
            <h4>Contact us to learn more.</h4>
            <ActiveCampaignForm
              formID="_form_1"
              formSrc="https://hatchloyalty.activehosted.com/f/embed.php?id=1"
            />
          </section>
        </Wrapper>
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(filter: { frontmatter: { featured: { eq: true } } }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
