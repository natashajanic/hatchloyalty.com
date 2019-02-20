import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Wrapper from '../components/wrapper'
import Box from '../components/box'
import Text from '../components/text'
import IconCircle from '../components/icon-circle'
import { Activity, BarChart, Layers, Repeat, UserCheck } from 'react-feather'

const Features = () => (
  <Layout>
    <SEO title="Features" keywords={['hatch', 'hatch loyalty', 'loyalty', 'personalization', 'activation', 'features']} />
    <Wrapper py={5}>

      {/* Hero */}
      <section>
        <Box display="flex" alignItems="center">
          <IconCircle bg="green">
            <Layers size={20} color="#fff" />
          </IconCircle>
          <Text fontSize={1} ml={2}>Hatch Insights</Text>
        </Box>

        <h2>A modern platform designed to make your loyalty-driven life infinitely easier.</h2>
        <h3>Hatch offers a comprehensive suite of flexible, dynamic, intuitive products that help you better know & serve your customers, and better manage &amp; grow your business.</h3>
      </section>
      <hr />

      {/* Profiles */}
      <section>
        <Box display="flex" alignItems="center">
          <IconCircle bg="green">
            <UserCheck size={20} color="#fff" />
          </IconCircle>
          <Text fontSize={1} ml={2}>Profiles</Text>
        </Box>

        <h3>Get to know your customers beyond simple transactions to understand who they are and activate when it matters most.</h3>
        <h4>Hatch offers a comprehensive suite of flexible, dynamic, intuitive products that help you better know & serve your customers, and better manage &amp; grow your business.</h4>
        <ul>
          <li>Pump</li>
          <li>Point of Sale</li>
          <li>Data Warehouse</li>
          <li>Marketing Automation</li>
          <li>Mobile App</li>
          <li>Website</li>
        </ul>
      </section>
      <hr />

      {/* Wisdom */}
      <section>
        <Box display="flex" alignItems="center">
          <IconCircle bg="green">
            <BarChart size={20} color="#fff" />
          </IconCircle>
          <Text fontSize={1} ml={2}>Wisdom</Text>
        </Box>

        <h3>Get smarter, faster, with real-time data analysis and easily accessible, actionable insights.</h3>
        <h4>Wisdom turns complex data into easy-to-interpret information, allowing you to better manage your loyalty program from insight to execution. Activate offers in real-time with exceptional ease. Leverage data based on customers personal preferences. Monitor and create rewards on the fly.</h4>
      </section>
      <hr />

      {/* Moments */}
      <section>
        <Box display="flex" alignItems="center">
          <IconCircle bg="green">
            <Activity size={20} color="#fff" />
          </IconCircle>
          <Text fontSize={1} ml={2}>Moments</Text>
        </Box>

        <h3>Impact purchase decisions right in the moment with personalized offers and rewards based on specific customer preferences.</h3>
        <h4>Moments, offers and rewards becomes truly personal and seriously effective. Create, activate, and modify offers in real time. Leverage data gathered through Profiles to provide personalized rewards and experiences that keep customers engaged and loyal.</h4>
      </section>
      <hr />

      {/* Habits */}
      <section>
        <Box display="flex" alignItems="center">
          <IconCircle bg="green">
            <Repeat size={20} color="#fff" />
          </IconCircle>
          <Text fontSize={1} ml={2}>Habits</Text>
        </Box>

        <h3>Get to know your customers beyond simple transactions to understand who they are and activate when it matters most.</h3>
        <h4>Hatch offers a comprehensive suite of flexible, dynamic, intuitive products that help you better know & serve your customers, and better manage &amp; grow your business.</h4>
        <h5>Segment By:</h5>
        <ul>
          <li>Member Activity</li>
          <li>Behavior</li>
          <li>Location</li>
          <li>Items Purchased</li>
          <li>Offers &amp; Rewards</li>
          <li>Vists</li>
        </ul>
      </section>
      <hr />

      {/* Solutions */}
      <section>
        <h5>Solutions</h5>
        <h3>Flexibility that meets a variety of needs, Hatch provides value for:</h3>
        <ul>
          <li>
            <h4>Brands &amp; CPG's</h4>
            <p>Similar to retailers, you want to get to know you customers. Unlike retailers, you may not readily have access to rich customer data. Hatch enables brands & CPGs to access actionable customer data through our retail partners.</p>
          </li>
          <li>
            <h4>Agencies &amp; Partners</h4>
            <p>If you’re an agency or tech provider who has a client that is looking for loyalty, but don’t want to deal with the cost and headache of building the tech yourself, Hatch’s flexible platform can integrate with your solution and initiatives.</p>
          </li>
          <li>
            <h4>Enterprise Retailers</h4>
            <p>The Hatch platform enables you to configure and design a program branded for your business. Most of what you’ll need is already built, but Hatch can enable unique experiences for your customers through integrations and extensions.</p>
          </li>
        </ul>
      </section>
    </Wrapper>
  </Layout>
)

export default Features
