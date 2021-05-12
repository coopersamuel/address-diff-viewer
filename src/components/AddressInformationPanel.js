import { useEffect } from 'react'
import AddressInformationCard from './AddressInformationCard'
import ResultsList from './ResultsList'
import { useApi } from '../hooks'
import { Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  addressCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  addressInfoHeader: {
    paddingBottom: '20px'
  }
})

const generateAddressEndpoint = userId => userId ? `/users/${userId}/addresses` : ''

const AddressInformationPanel = ({ userId, selectedAddress, onAddressClick }) => {
  const [{ data: addresses, isLoading, isError }, fetchAddresses] = useApi(generateAddressEndpoint(userId))
  useEffect(() => {
    if (!userId) return
    fetchAddresses(generateAddressEndpoint(userId)) 
  }, [userId]) // Fetch new addresses whenever the userId prop changes
  const classes = useStyles()

  const resultsListProps = {
    results: addresses,
    isLoading,
    isError,
    errorText: 'There was an error fetching addresses for this user',
    noResultsText: 'Select a User ID to view addresses',
    selected: selectedAddress,
    resultComponent: <AddressInformationCard />,
    onResultClick: addressId => onAddressClick(addressId)
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
              <ResultsList { ...resultsListProps } />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressInformationPanel
