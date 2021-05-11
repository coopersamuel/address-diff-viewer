import { useState } from 'react'
import { useApi } from '../hooks'
import AddressInformationPanel from './AddressInformationPanel'
import { Grid, Select, Typography, Box, MenuItem, makeStyles, FormControl, InputLabel } from '@material-ui/core'

const useStyles = makeStyles({
  idSelect: {
    width: '100%'
  }
})

/**
 * AddressDiffViewer is the parent component that handles
 * rendering and layout of child components as well as initial data fetching
 */
const AddressDiffViewer = () => {
  // Fetch the userIds on component mount
  const [{ data: userIds, isLoading, isError }, fetchUserIds] = useApi('/user_ids')
  const [selectedUser, setSelectedUser] = useState('')
  const classes = useStyles()

  // TODO - Handle loading and error states

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mt="30px">
            <Typography variant="h4">
              Address Diff Viewer
            </Typography>
          </Box>
        </Grid>
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
          <AddressInformationPanel userId={selectedUser} />
        </Grid>
        <Grid item xs={6}>
          hello
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressDiffViewer
