import { shallow, ShallowWrapper } from 'enzyme'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Panel from '../panel'

describe('Panel', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Panel />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly with a pointer cursor', async () => {
      mountedComponent.setProps({ cursor: 'pointer' })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly when disabled', async () => {
      mountedComponent.setProps({ disabled: true })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly with an alternate background', async () => {
      mountedComponent.setProps({ background: 'greenLight' })
      expect(mountedComponent).toMatchSnapshot()
    })
  })

  it('has a display name', () => {
    expect(Panel.displayName).toEqual('Panel')
  })
})

describe('Panel.Header', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Panel.Header />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })

  it('has a display name', () => {
    expect(Panel.Header.displayName).toEqual('Panel.Header')
  })
})

describe('Panel.Title', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Panel.Title />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})

describe('Panel.Body', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Panel.Body />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})

describe('Panel.Footer', () => {
  let mountedComponent: ShallowWrapper<any, any, any>

  beforeEach(() => {
    mountedComponent = shallow(<Panel.Footer />)
  })

  describe('render', () => {
    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })

  it('has a display name', () => {
    expect(Panel.Footer.displayName).toEqual('Panel.Footer')
  })
})
