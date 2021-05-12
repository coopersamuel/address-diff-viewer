import { useHistory, useLocation } from 'react-router-dom'
import { sortBy } from 'lodash'
import { useApi } from '../hooks'
import DiffViewer from './DiffViewer'
import { Button, Box, Grid, Typography, CircularProgress } from '@material-ui/core'

const DiffDashboard = () => {
  const history = useHistory()
  const location = useLocation()

  // Sort events by the created_at timestamp to ensure that the older event is always on the left pane of the viewer
  const sortedEvents = sortBy(location.state.selectedEvents, event => new Date(event.created_at))
  const [leftEvent, rightEvent] = sortedEvents

  const [{ 
    data: leftAddress, 
    isLoading: leftAddressLoading, 
    isError: leftAddressError 
  }, _refetchLeftAddress] = useApi(leftEvent.url, null)
  const [{ 
    data: rightAddress, 
    isLoading: rightAddressLoading, 
    isError: rightAddressError 
  }, _refetchRightAddress] = useApi(rightEvent.url, null)

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

  // In the case where an address has been deleted, our api sets a deleted_at flag. 
  // Simulating the deleted address with an empty object
  const leftAddressDeleted = leftAddress && leftAddress.deleted_at
  const rightAddressDeleted = rightAddress && rightAddress.deleted_at

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
          <DiffViewer 
            leftAddress={leftAddressDeleted ? {} : leftAddress} 
            rightAddress={rightAddressDeleted ? {} : rightAddress} 
          />
        )}
      </Grid>
    </Box>
  )
}

export default DiffDashboard
