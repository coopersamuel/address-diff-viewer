import { useState, useEffect } from 'react'
import { useApi } from '../hooks'
import { Button, Grid, Card, Typography, CardContent, CardActions, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  idSelect: {
    width: '100%'
  }
})

const generateAddressEndpoint = userId => userId ? `/users/${userId}/addresses` : ''

const renderAddressCard = address => {
  return (
    <Card key={address.id}>
      {address.id}
      {/* <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          benevolent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

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
        <Grid item xs={12}>
          {addresses.map(address => renderAddressCard(address))}
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressInformationPanel
