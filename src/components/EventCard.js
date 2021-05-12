import { Checkbox, Grid, Card, Typography, CardContent, withStyles } from '@material-ui/core'

const BlueCheckbox = withStyles({
  root: {
    color: '#528ef6',
    '&$checked': {
      color: '#528ef6',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const EventCard = ({ data: event, checked }) => {
  const { id, type, created_at } = event

  return (
    <Grid item xs={12}>
      <Card key={id}>
        <CardContent>
          <Grid container alignItems="center" justify="space-between">
            <Grid container item alignItems="center" xs={6}>
              <BlueCheckbox checked={checked} />
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
