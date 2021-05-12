import { useEffect } from 'react'
import ResultsList from './ResultsList'
import EventCard from './EventCard'
import { useApi } from '../hooks'
import { Button, Box, Grid, Card, Typography, CardContent, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  eventCardContainer: {
    backgroundColor: '#e7e7e7',
    width: '100%'
  },
  eventInfoHeader: {
    paddingBottom: '10px'
  },
  compareButton: {
    backgroundColor: '#528ef6',
    color: '#ffffff'
  }
})

const generateEventEndpoint = addressId => addressId ? `/addresses/${addressId}/events` : ''

const EventPanel = ({ userId, addressId, selectedEvents, onEventClick, onCompareClick }) => {
  const [{ data: events, isLoading, isError }, fetchEvents, clearEvents] = useApi(generateEventEndpoint(addressId))
  useEffect(() => {
    if (!addressId) {
      // If the userId changes and there is no addressId, clear any events
      clearEvents()
      return
    }

    fetchEvents(generateEventEndpoint(addressId)) 
  }, [userId, addressId]) // Fetch new events whenever the addressId prop changes
  const classes = useStyles()

  const resultsListProps = {
    results: events,
    isLoading,
    isError,
    errorText: 'There was an error fetching events for this address',
    noResultsText: 'Select an address to view related events',
    selected: selectedEvents,
    resultComponent: <EventCard />,
    onResultClick: event => onEventClick(event)
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Card className={classes.eventCardContainer}>
            <CardContent>
              <Box mb="10px">
                <Grid container>
                  <Grid item>
                    <Box mr="20px">
                      <Typography variant="h5" className={classes.eventInfoHeader}>
                        Events
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button onClick={onCompareClick} variant="contained" color="primary" disabled={selectedEvents.length !== 2}>
                      Compare
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <ResultsList { ...resultsListProps } />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default EventPanel
