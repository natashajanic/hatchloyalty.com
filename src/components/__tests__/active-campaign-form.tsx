import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import ActiveCampaignForm, { IActiveCampaignFormProps } from '../active-campaign-form'
import { async } from 'q';

describe('ActiveCampaignForm', () => {
  let props: IActiveCampaignFormProps
  let mountedComponent: ShallowWrapper<any, any, ActiveCampaignForm>

  beforeEach(() => {
    props = {
      formID: '_form_1',
      formSrc: 'https://hatchloyalty.activehosted.com/f/embed.php?id=1'
    }
    mountedComponent = shallow(<ActiveCampaignForm {...props}/>)
  })

  describe('render', () => {
    it('renders a div with the provided form ID', async () => {
      expect(mountedComponent.find('div').length).toEqual(1)
      expect(mountedComponent.find('div').at(0).prop('className')).toEqual(props.formID)
    })

    it('renders a script tag with the provided form src', async () => {
      expect(mountedComponent.find('script').length).toEqual(1)
      expect(mountedComponent.find('script').at(0).prop('src')).toEqual(props.formSrc)
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
