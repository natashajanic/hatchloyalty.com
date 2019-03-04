import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import FeaturesPage from '../features'

describe('FeaturesPage', () => {
  let mountedComponent: ShallowWrapper<any, any, FeaturesPage>

  beforeEach(() => {
    mountedComponent = shallow(<FeaturesPage />)
  })

  describe('render', () => {
    it("renders six sections that cover the platform's features", async () => {
      expect(mountedComponent.find('section').length).toEqual(6)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
