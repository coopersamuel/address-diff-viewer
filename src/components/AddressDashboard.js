import { useState } from 'react'
import { useApi } from '../hooks'
import AddressInformationPanel from './AddressInformationPanel'
import EventPanel from './EventPanel'
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

  const handleEventClick = eventId => {
    // First, check if this event is already selected, if so, deselect
    if (selectedEvents.includes(eventId)) {
      const filteredEvents = selectedEvents.filter(event => event !== eventId)
      setSelectedEvents(filteredEvents)
    } else if (selectedEvents.length < 2) {
      // There cannot be more than 2 events selected at a time
      setSelectedEvents([...selectedEvents, eventId])
    }
  }

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
            <Select value={selectedUser} onChange={event => handleUserIdSelect(event.target.value)}>
              {userIds.map(userId => <MenuItem key={userId} value={userId}>{userId}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <AddressInformationPanel userId={selectedUser} selectedAddress={selectedAddress} onAddressClick={handleAddressClick} />
        </Grid>
        <Grid item xs={6}>
          <EventPanel addressId={selectedAddress} selectedEvents={selectedEvents} onEventClick={handleEventClick} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AddressDashboard
