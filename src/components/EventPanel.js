import { useEffect } from 'react'
import AddressInformationCard from './AddressInformationCard'
import { useApi } from '../hooks'
import { Grid, Card, Typography, CardContent, Box, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  eventCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  eventInfoHeader: {
    paddingBottom: '10px'
  },
  loadingSpinner: {
    fontSize: '20px'
  }
})

const generateEventEndpoint = addressId => addressId ? `/addresses/${addressId}/events` : ''

const EventPanel = ({ addressId }) => {
  const [{ data: addresses, isLoading, isError }, fetchAddresses] = useApi(generateEventEndpoint(addressId))
  useEffect(() => {
    if (!addressId) return
    fetchAddresses(generateEventEndpoint(addressId)) 
  }, [addressId]) // Fetch new addresses whenever the userId prop changes
  const classes = useStyles()

  // const renderResults = (addresses, isLoading, isError) => {
  //   // Handle rendering for loading, error and no results states
  //   if (isLoading) {
  //     return (
  //       <Grid container justify="center">
  //         <CircularProgress size={30} />
  //       </Grid>
  //     )
  //   } else if (isError) {
  //     return (
  //       <Typography variant="subtitle2" color="error">
  //         There was an error fetching addresses for this user
  //       </Typography>
  //     )
  //   } else if (!addresses.length) {
  //     return (
  //       <Typography variant="subtitle2">
  //         Select a User ID to view addresses
  //       </Typography>
  //     )
  //   } else {
  //     return addresses.map(address => {
  //       return (
  //         <Box key={address.id} mb="10px" onClick={() => onAddressClick(address.id)}>
  //           <AddressInformationCard address={address} />
  //         </Box>
  //       )
  //     })
  //   }
  // }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.eventCardContainer}>
            <CardContent>
              <Typography variant="h5" className={classes.eventInfoHeader}>
                Events
              </Typography>
              {/* {renderResults(addresses, isLoading, isError)} */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default EventPanel
