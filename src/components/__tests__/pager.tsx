import { shallow, ShallowWrapper } from 'enzyme'
import { Link } from 'gatsby'
import 'jest' // tslint:disable-line no-import-side-effect
import * as React from 'react'
import Pager, { IPagerProps } from '../pager'

describe('Pager', () => {
  let props: IPagerProps
  let mountedComponent: ShallowWrapper<any, any, Pager>

  beforeEach(() => {
    props = {
      basePath: '/blogs',
      currentPage: 6,
      maxPage: 11,
    }
    mountedComponent = shallow(<Pager {...props} />)
  })

  describe('render', () => {
    it('shows a previous page option', async () => {
      expect(mountedComponent.text()).toContain('< Prev')
      const prevLink = mountedComponent.find(Link).first()
      expect(prevLink.prop('to')).toEqual('/blogs/5')
    })

    it('does not show a previous page option on the first page', async () => {
      mountedComponent.setProps({ currentPage: 1 })
      expect(mountedComponent.text()).not.toContain('< Prev')
    })

    it('shows a next page option', async () => {
      expect(mountedComponent.text()).toContain('Next >')
      const nextLink = mountedComponent.find(Link).last()
      expect(nextLink.prop('to')).toEqual('/blogs/7')
    })

    it('does not show a next page option on the last page', async () => {
      mountedComponent.setProps({ currentPage: 11 })
      expect(mountedComponent.text()).not.toContain('Next >')
    })

    it('shows an ellipsis if there are more than 4 pages before the current page', async () => {
      mountedComponent.setProps({ currentPage: 6, maxPage: 9 })
      expect(mountedComponent.text()).toContain('...')
    })

    it('shows an ellipsis if there are more than 4 pages after the current page', async () => {
      mountedComponent.setProps({ currentPage: 4, maxPage: 9 })
      expect(mountedComponent.text()).toContain('...')
    })

    it('shows no ellipsis if there are not more than 4 pages before or after the current page', async () => {
      mountedComponent.setProps({ currentPage: 5, maxPage: 9 })
      expect(mountedComponent.text()).not.toContain('...')
    })

    it('shows a link for up to four pages before and after the current page', async () => {
      expect(mountedComponent.find(Link).length).toEqual(1 + 4 + 4 + 1)
      Array(4)
        .fill(1)
        .forEach((_, index) => {
          const link = mountedComponent.find(Link).at(1 + index)
          expect(link.prop('to')).toEqual(`/blogs/${2 + index}`)
        })
      Array(4)
        .fill(1)
        .forEach((_, index) => {
          const link = mountedComponent.find(Link).at(5 + index)
          expect(link.prop('to')).toEqual(`/blogs/${7 + index}`)
        })
    })

    it('renders properly for small page numbers', async () => {
      mountedComponent.setProps({ currentPage: 2, maxPage: 4 })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly for the first page', async () => {
      mountedComponent.setProps({ currentPage: 1 })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('renders properly for the last page', async () => {
      mountedComponent.setProps({ currentPage: 11 })
      expect(mountedComponent).toMatchSnapshot()
    })

    it('matches the expected snapshot', async () => {
      expect(mountedComponent).toMatchSnapshot()
    })
  })
})
