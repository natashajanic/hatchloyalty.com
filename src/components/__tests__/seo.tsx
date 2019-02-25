import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Helmet from 'react-helmet'
import { IPureSEOProps, PureSEO } from '../seo'

describe('Layout', () => {
  let props: IPureSEOProps
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    props = {
      data: {
        site: {
          siteMetadata: {
            author: 'John Doe',
            description: 'Hatch Loyalty is modern customer activation.',
            title: 'Hatch Loyalty',
          },
        },
      },
      title: 'Hatch Loyalty',
    }
    mountedComponent = shallow(<PureSEO {...props} />)
  })

  describe('render', () => {
    it('renders a helmet', async () => {
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('title')
      ).toEqual(props.title)
    })

    it('sets the language to english by default', async () => {
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('htmlAttributes').lang
      ).toEqual('en')
    })

    it('sets the language to the specified prop', async () => {
      mountedComponent.setProps({ lang: 'de' })
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('htmlAttributes').lang
      ).toEqual('de')
    })

    it('includes any specified meta entries', async () => {
      const testMeta = { name: 'test', content: 'Test Content' }
      mountedComponent.setProps({ meta: [testMeta] })
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('meta')
      ).toContainEqual(testMeta)
    })

    it('includes the specified keywords as a meta entry', async () => {
      mountedComponent.setProps({ keywords: ['test', 'hatch'] })
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('meta')
      ).toContainEqual({
        name: 'keywords',
        content: 'test, hatch',
      })
    })

    it('includes the specified description as a meta entry', async () => {
      mountedComponent.setProps({ description: 'Test Description' })
      expect(mountedComponent.find(Helmet).length).toEqual(1)
      expect(
        mountedComponent
          .find(Helmet)
          .at(0)
          .prop('meta')
      ).toContainEqual({
        name: 'description',
        content: 'Test Description',
      })
    })

    it('renders properly with overriden attributes', async () => {
      mountedComponent.setProps({
        description: 'Test Description',
        keywords: ['test', 'hatch'],
        lang: 'de',
        meta: [{ name: 'test', content: 'Test Content' }],
        title: 'Test Title',
      })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
