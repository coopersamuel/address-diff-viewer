import { Fragment } from 'react'
import { Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core'

// Always execute an address diff in this order
const ADDRESS_KEYS = ['street_one', 'street_two', 'city', 'state_id', 'zip_code', 'country_id']

const useStyles = makeStyles({
  diffPaneContainer: {
    backgroundColor: '#ffffff',
    width: '100%'
  },
  outdatedDiffLine: {
    backgroundColor: '#f77997'
  },
  newDiffLine: {
    backgroundColor: '#85d6a0'
  }
})

const DiffViewer = ({ leftAddress, rightAddress }) => {
  const classes = useStyles()

  if (!leftAddress || !rightAddress) return <div />

  return (
    <Grid item xs={12}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.diffPaneContainer}>
            <CardContent>
              <Grid container spacing={0}>
                {ADDRESS_KEYS.map(key => {
                  const hasChange = leftAddress[key] !== rightAddress[key]
                  return (
                    <Fragment key={key}>
                      <Grid item xs={6}>
                        <Typography className={hasChange ? classes.outdatedDiffLine : ''}>
                          {leftAddress[key]}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography className={hasChange ? classes.newDiffLine : ''}>
                          {rightAddress[key]}
                        </Typography>
                      </Grid>
                    </Fragment>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DiffViewer
