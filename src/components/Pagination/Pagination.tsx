import React from 'react'
import {ChevronLeft, ChevronRight} from 'react-feather'
import {ButtonBase} from '@material-ui/core'
import {usePagination} from '@material-ui/lab'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import clsx from 'clsx'
import {colors} from '../../theme/theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paginationCustom: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      '& li:first-child': {
        marginRight: '6px',
      },
      '& li:last-child': {
        marginLeft: '6px',
      },
    },
    page: {
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
      color: '#C4C4C4',
      fontSize: '14px',
      width: '24px',
      height: '30px',
      margin: '0 6px',
      borderRadius: '4px',
      lineHeight: '1.43',
      '&:hover': {
        boxShadow: '0px 0px 4px 2px rgba(180, 229, 255, 0.3)',
        cursor: 'pointer',
      },
    },
    selected: {
      border: '1px solid #E5F6FF',
      color: '#E5F6FF',
    },
    prevNextButton: {
      background: '#2E3343',
      width: '24px',
      height: '30px',
      borderRadius: '4px',
      lineHeight: '1.43',
      '&.Mui-disabled': {
        '& svg': {
          stroke: '#474747',
        },
      },
      '&:hover': {
        boxShadow: '0px 0px 4px 2px rgba(180, 229, 255, 0.3)',
      },
    },
    ellipsis: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 6px',
      paddingTop: '5px',
      color: '#c4c4c4',
    },
  }),
)

interface PaginationProps {
  count: number
  page: number
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const Pagination = ({count, page, onChange}: PaginationProps) => {
  const classes = useStyles()

  const {items} = usePagination({
    count,
    page,
    onChange,
  })

  return (
    <nav>
      <ul className={classes.paginationCustom}>
        {items.map(({page, type, selected, ...item}, index) => {
          let children = null

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = <div className={classes.ellipsis}>...</div>
          } else if (type === 'page') {
            children = (
              <ButtonBase {...item} className={clsx(classes.page, {[classes.selected]: selected})}>
                {page}
              </ButtonBase>
            )
          } else if (type === 'previous') {
            children = (
              <ButtonBase {...item} className={classes.prevNextButton}>
                <ChevronLeft color={colors(true).dark.white} strokeWidth={1} height={20} width={20} />
              </ButtonBase>
            )
          } else if (type === 'next') {
            children = (
              <ButtonBase {...item} className={classes.prevNextButton}>
                <ChevronRight color={colors(true).dark.white} strokeWidth={1} height={20} width={20} />
              </ButtonBase>
            )
          } else {
            children = <ButtonBase {...item}>{type}</ButtonBase>
          }

          return <li key={index}>{children}</li>
        })}
      </ul>
    </nav>
  )
}

export default Pagination
