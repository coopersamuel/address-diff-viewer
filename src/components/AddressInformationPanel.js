import { useState } from 'react'
import { useApi } from '../hooks'
import { Button, Grid, Select, MenuItem, makeStyles, FormControl, InputLabel } from '@material-ui/core'

const useStyles = makeStyles({
  idSelect: {
    width: '100%'
  }
})

const AddressInformationPanel = ({ userId }) => {
  // Fetch the addresses for the given userId
  const addressesEndpoint = `/users/${userId}/addresses`
  const [{ data: addresses, isLoading, isError }, fetchAddresses] = useApi(addressesEndpoint)
  // const [selectedUser, setSelectedUser] = useState('')
  // const classes = useStyles()

  return (
    <div>
      <Button onClick={() => fetchAddresses(addressesEndpoint)}>Yo</Button>
      {/* <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl variant="filled" className={classes.idSelect}>
            <InputLabel>Select a User ID</InputLabel>
            <Select value={selectedUser} onChange={event => setSelectedUser(event.target.value)}>
              {userIds.map(userId => <MenuItem key={userId} value={userId}>{userId}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          hello
        </Grid>
        <Grid item xs={6}>
          hello
        </Grid>
      </Grid> */}
    </div>
  )
}

export default AddressInformationPanel
