import { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useApi } from '../hooks'
import AddressInformationPanel from './AddressInformationPanel'
import EventPanel from './EventPanel'
import DiffViewer from './DiffViewer'
import { Grid, Select, Typography, Box, MenuItem, makeStyles, FormControl, InputLabel } from '@material-ui/core'

const useStyles = makeStyles({
  idSelect: {
    width: '100%'
  }
})

/**
 * AddressDashboard is the parent component that handles state
 * for the address and event selection portion of the app
 */
const AddressDashboard = () => {
  // Fetch the userIds on component mount
  const [{ data: userIds, isLoading, isError }, fetchUserIds] = useApi('/user_ids')
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [selectedEvents, setSelectedEvents] = useState([])
  const history = useHistory()
  const classes = useStyles()

  // TODO - Handle loading and error states
  // TODO - Clear events on userId change
  // TODO - Handle all the console warnings

  const handleUserIdSelect = userId => {
    setSelectedUser(userId)
    // Also clear selected address and events, if applicable
    setSelectedAddress('')
    setSelectedEvents([])
  }

  const handleAddressClick = addressId => {
    setSelectedAddress(addressId)
    // Also clear any selected events
    setSelectedEvents([])
  }

  const handleEventClick = addressEvent => {
    const { id: eventId } = addressEvent
    
    // First, check if this event is already selected, if so, deselect
    if (selectedEvents.find(event => event.id === eventId)) {
      const filteredEvents = selectedEvents.filter(event => event.id !== eventId)
      setSelectedEvents(filteredEvents)
    } else if (selectedEvents.length < 2) {
      // There cannot be more than 2 events selected at a time
      setSelectedEvents([...selectedEvents, addressEvent])
    }
  }

  const handleCompareClick = () => {
    history.push({
      pathname: '/diff',
      state: { selectedEvents }
    })
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mt="30px">
            <Typography variant="h4">
              Address Diff Viewer
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Switch>
        <Route path="/diff">
          <DiffViewer />
        </Route>
        <Route path="/">
          <Grid container spacing={3}>
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <FormControl variant="filled" className={classes.idSelect}>
                  <InputLabel>Select a User ID</InputLabel>
                  <Select value={selectedUser} onChange={event => handleUserIdSelect(event.target.value)}>
                    {userIds.map(userId => <MenuItem key={userId} value={userId}>{userId}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <AddressInformationPanel userId={selectedUser} selectedAddress={selectedAddress} onAddressClick={handleAddressClick} />
            </Grid>
            <Grid item xs={6}>
              <EventPanel addressId={selectedAddress} selectedEvents={selectedEvents} onEventClick={handleEventClick} onCompareClick={handleCompareClick} />
            </Grid>
          </Grid>
        </Route>
      </Switch>
    </>
  )
}

export default AddressDashboard
