import * as React from 'react'
import { Link } from 'gatsby'
import system from 'system-components'
import Box from './box'

const PagerWrapper = system({
  is: Box,
  display: 'flex',
  justifyContent: 'center',
  mb: 2,
  pa: 2,
})

const PagerBox = system({
  is: Box,
  alignItems: 'center',
  display: 'flex',
  height: '2em',
  justifyContent: 'center',
})

const PagerLink = system({
  is: PagerBox,
  background: 'white',
  border: 'solid 1px',
  borderColor: 'gray',
  borderRadius: '0.25em',
  color: 'green',
  minWidth: '2em',
  mx: 1,
  px: 2,
})

const PageCurrentPage = system({
  is: PagerLink,
  borderColor: 'grayDark',
  color: 'grayDark',
})

const PagerPlaceholder = system({
  is: PagerBox,
  color: 'grayDark',
  mx: 2,
})

interface IPagerProps {
  basePath: string
  currentPage: number
  maxPage: number
}

class Pager extends React.Component<IPagerProps, {}> {
  renderLink(pageNum: number, text: string) {
    const { basePath } = this.props

    return (
      <Link
        key={`page-${pageNum}`}
        style={{ textDecoration: 'none' }}
        to={pageNum === 1 ? basePath : `${basePath}/${pageNum}`}
      >
        <PagerLink>{text}</PagerLink>
      </Link>
    )
  }

  renderPageLinks(startingPage: number, endingPage: number) {
    const { currentPage } = this.props

    return Array(endingPage - startingPage + 1)
      .fill(1)
      .map((_, index) => {
        const pageNum = startingPage + index
        if (pageNum === currentPage) {
          return (
            <PageCurrentPage key={`page-${pageNum}`}>{pageNum}</PageCurrentPage>
          )
        }
        return this.renderLink(pageNum, `${pageNum}`)
      })
  }

  render() {
    const { currentPage, maxPage } = this.props

    const hasPrev = currentPage > 1
    const hasNext = currentPage < maxPage
    const startingPage = Math.max(1, currentPage - 4)
    const endingPage = Math.min(maxPage, currentPage + 4)

    return (
      <PagerWrapper>
        {hasPrev && this.renderLink(currentPage - 1, '< Prev')}
        {startingPage > 1 && <PagerPlaceholder>...</PagerPlaceholder>}
        {this.renderPageLinks(startingPage, endingPage)}
        {endingPage < maxPage && <PagerPlaceholder>...</PagerPlaceholder>}
        {hasNext && this.renderLink(currentPage + 1, 'Next >')}
      </PagerWrapper>
    )
  }
}

export default Pager
