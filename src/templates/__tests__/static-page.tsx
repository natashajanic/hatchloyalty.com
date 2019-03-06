import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Wrapper from 'src/components/wrapper'
import { mockStaticPage } from 'src/models/mocks'
import StaticPageTemplate, { IStaticPageTemplateProps } from '../static-page'

describe('StaticPageTemplate', () => {
  let props: IStaticPageTemplateProps
  let mountedComponent: ShallowWrapper<any, any, StaticPageTemplate>

  beforeEach(() => {
    props = {
      pageContext: {
        page: mockStaticPage,
      },
    }
    mountedComponent = shallow(<StaticPageTemplate {...props} />)
  })

  describe('render', () => {
    it('renders the html content within a page wrapper', async () => {
      expect(mountedComponent.find(Wrapper).length).toEqual(1)
      expect(mountedComponent.find(Wrapper).html()).toContain(
        props.pageContext.page.html
      )
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
