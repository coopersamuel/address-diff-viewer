import { useEffect } from 'react'
import AddressInformationCard from './AddressInformationCard'
import { useApi } from '../hooks'
import { Grid, Card, Typography, CardContent, Box, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  addressCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  addressInfoHeader: {
    paddingBottom: '10px'
  },
  loadingSpinner: {
    fontSize: '20px'
  }
})

const generateAddressEndpoint = userId => userId ? `/users/${userId}/addresses` : ''

const AddressInformationPanel = ({ userId }) => {
  const [{ data: addresses, isLoading, isError }, fetchAddresses] = useApi(generateAddressEndpoint(userId))
  useEffect(() => {
    if (!userId) return
    fetchAddresses(generateAddressEndpoint(userId)) 
  }, [userId]) // Fetch new addresses whenever the userId prop changes
  const classes = useStyles()

  const renderResults = (addresses, isLoading, isError) => {
    // Handle rendering for loading, error and no results states
    if (isLoading) {
      return (
        <Grid container justify="center">
          <CircularProgress size={30} />
        </Grid>
      )
    } else if (isError) {
      return (
        <Typography variant="subtitle2" color="error">
          There was an error fetching addresses for this user
        </Typography>
      )
    } else if (!addresses.length) {
      return (
        <Typography variant="subtitle2">
          Select a User ID to view addresses
        </Typography>
      )
    } else {
      return addresses.map(address => {
        return (
          <Box key={address.id} mb="10px">
            <AddressInformationCard address={address} />
          </Box>
        )
      })
    }
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.addressCardContainer}>
            <CardContent>
              <Typography variant="h5" className={classes.addressInfoHeader}>
                Address Information
              </Typography>
              {renderResults(addresses, isLoading, isError)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressInformationPanel
