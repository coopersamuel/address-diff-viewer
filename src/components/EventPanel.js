import { useEffect } from 'react'
import ResultsList from './ResultsList'
import EventCard from './EventCard'
import { useApi } from '../hooks'
import { Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  eventCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  eventInfoHeader: {
    paddingBottom: '10px'
  }
})

const generateEventEndpoint = addressId => addressId ? `/addresses/${addressId}/events` : ''

const EventPanel = ({ addressId, selectedEvents, onEventClick }) => {
  const [{ data: events, isLoading, isError }, fetchEvents] = useApi(generateEventEndpoint(addressId))
  useEffect(() => {
    if (!addressId) return
    fetchEvents(generateEventEndpoint(addressId)) 
  }, [addressId]) // Fetch new events whenever the addressId prop changes
  const classes = useStyles()

  const resultsListProps = {
    results: events,
    isLoading,
    isError,
    errorText: 'There was an error fetching events for this address',
    noResultsText: 'Select an address to view related events',
    selected: selectedEvents,
    resultComponent: <EventCard />,
    onResultClick: eventId => onEventClick(eventId)
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.eventCardContainer}>
            <CardContent>
              <Typography variant="h5" className={classes.eventInfoHeader}>
                Events
              </Typography>
              <ResultsList { ...resultsListProps } />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default EventPanel
