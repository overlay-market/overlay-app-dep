import React, {forwardRef, useCallback} from 'react'
import {Clock, X, CheckCircle, AlertCircle} from 'react-feather'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import {useSnackbar, SnackbarContent} from 'notistack'
import {PopupType} from './SnackbarAlert'
import {ExternalLinkIcon} from '../ExternalLink/ExternalLink'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '344px !important',
    },
  },
  card: {
    backgroundColor: '#3A3D48',
    width: '100%',
  },
  typography: {
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
  },
  icons: {
    marginLeft: 'auto !important',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
}))

const SnackMessage = forwardRef<HTMLDivElement, {id: string | number; message: string | React.ReactNode}>((props, ref) => {
  const classes = useStyles()
  const {closeSnackbar} = useSnackbar()

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  let parsed = undefined
  let parsedMessage
  let parsedVariant
  let parsedHash

  if (typeof props.message === 'string') {
    parsed = JSON.parse(props.message)
  }

  if (parsed) {
    let {message, variant, hash} = parsed
    parsedMessage = message
    parsedVariant = variant
    parsedHash = hash
  }

  let VariantIcon = ({variant}: {variant: PopupType | undefined}) => {
    if (variant === PopupType.WARNING) return <Clock color={'#F2F2F2'} size={20} />
    else if (variant === PopupType.SUCCESS) return <CheckCircle color={'#10DCB1'} size={20} />
    else return <AlertCircle color={'#F2F2F2'} size={20} />
  }

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{root: classes.actionRoot}}>
          <VariantIcon variant={parsedVariant} />
          <Typography variant="subtitle2" className={classes.typography}>
            {!parsed ? props.message : parsedMessage}
          </Typography>
          <div className={classes.icons}>
            {parsedVariant === PopupType.SUCCESS && parsedHash ? (
              <ExternalLinkIcon href={`https://kovan.etherscan.io/tx/${parsedHash}`} />
            ) : (
              <IconButton className={classes.expand} onClick={handleDismiss}>
                <X color={'#F2F2F2'} size={16} />
              </IconButton>
            )}
          </div>
        </CardActions>
      </Card>
    </SnackbarContent>
  )
})

export default SnackMessage
