import { Checkbox, Grid, Card, Typography, CardContent } from '@material-ui/core'

const EventCard = ({ data: event, checked }) => {
  const { id, type, created_at } = event

  return (
    <Grid item xs={12}>
      <Card key={id}>
        <CardContent>
          <Grid container alignItems="center" justify="space-between">
            <Grid container item alignItems="center" xs={6}>
              <Checkbox checked={checked} />
              <Typography color="textSecondary">{type}</Typography>
            </Grid>
            <Grid item>
              <Typography>{created_at}</Typography>  
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default EventCard
