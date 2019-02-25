import * as React from 'react'
import Helmet from 'react-helmet'

interface IActiveCampaignFormProps {
  formID: string
  formSrc: string
}

class ActiveCampaignForm extends React.Component<IActiveCampaignFormProps, {}> {
  render() {
    const {
      formID,
      formSrc,
    } = this.props
    return (
      <div className={formID}>
      <Helmet>
          <script
            src={formSrc}
            type="text/javascript"
            charSet="utf-8"
          />
      </Helmet>
    </div>
    )
  }
}

export default ActiveCampaignForm
