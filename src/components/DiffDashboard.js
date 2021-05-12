import { useHistory, useLocation } from 'react-router-dom'
import { sortBy } from 'lodash'
import { useApi } from '../hooks'
import { Button, Box, Grid, Card, Typography, CardContent, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  diffPaneContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  }
})

const DiffDashboard = () => {
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  // Sort events by the created_at timestamp to ensure that the older event is always on the left pane of the viewer
  const sortedEvents = sortBy(location.state.selectedEvents, event => new Date(event.created_at))
  const [leftEvent, rightEvent] = sortedEvents

  const [{ 
    data: leftAddress, 
    isLoading: leftAddressLoading, 
    isError: leftAddressError 
  }, fetchLeftAddress] = useApi(leftEvent.url)
  const [{ 
    data: rightAddress, 
    isLoading: rightAddressLoading, 
    isError: rightAddressError 
  }, fetchRightAddress] = useApi(rightEvent.url)

  const isLoading = leftAddressLoading || rightAddressLoading

  const handleBackClick = () => {
    history.goBack()
  }

  if (leftAddressError || rightAddressError) {
    return (
      <Box mt="20px">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button onClick={handleBackClick} variant="contained">
              Go Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="error">
              There was an error fetching addresses
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <Box mt="20px">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button onClick={handleBackClick} variant="contained">
            Go Back
          </Button>
        </Grid>
        {isLoading ? (
          <Grid container justify="center">
            <Box mt="30px">
              <CircularProgress size={30} />
            </Box>
          </Grid>
        ) : (
          <>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid container item xs={12}>
                  <Card className={classes.diffPaneContainer}>
                    <CardContent>

                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid container item xs={12}>
                  <Card className={classes.diffPaneContainer}>
                    <CardContent>

                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default DiffDashboard
