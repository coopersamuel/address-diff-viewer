import { useEffect } from 'react'
import AddressInformationCard from './AddressInformationCard'
import { useApi } from '../hooks'
import { Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  addressCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  addressInfoHeader: {
    paddingBottom: '10px'
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

  return (
    <div>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.addressCardContainer}>
            <CardContent>
              <Typography variant="h5" className={classes.addressInfoHeader}>
                Address Information
              </Typography>
              {addresses.map(address => <AddressInformationCard address={address} />)}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressInformationPanel
