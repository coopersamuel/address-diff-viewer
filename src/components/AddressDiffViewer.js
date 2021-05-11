import { useState } from 'react'
import { useApi } from '../hooks'
import { Grid, Select, MenuItem, makeStyles, FormControl, InputLabel } from '@material-ui/core'

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
  // Fetch the userIds on mounted
  const [{ data: userIds, isLoading, isError }, executeFetch] = useApi('http://localhost:5000/user_ids')
  const [selectedUser, setSelectedUser] = useState('')

  // TODO - Handle loading and error states

  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={3}>
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
      </Grid>
    </div>
  )
}

export default AddressDiffViewer;
