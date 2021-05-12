import { useState } from 'react'
import { Button, Grid, Card, Typography, CardContent, CardActions, Collapse, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  expandableContent: {
    paddingTop: '10px'
  },
  smallRightPadding: {
    paddingRight: '10px'
  }
})

const AddressInformationCard = ({ data: address }) => {
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()

  const { id, user_id, street_one, street_two, city, state_id, zip_code, country_id, created_at, updated_at, deleted_at } = address
  const handleExpandClick = event => {
    event.stopPropagation()
    setExpanded(!expanded)
  }

  // Don't display deleted addresses
  if (deleted_at) return <div />

  return (
    <Grid item xs={10}>
      <Card key={id}>
        <CardContent>
          <Typography color="textSecondary">
            {street_one}
          </Typography>
          <Typography color="textSecondary">
            {street_two}
          </Typography>
          <Typography variant="body2" component="p">
            {city}, {state_id} {zip_code} {country_id}
          </Typography>
          <Collapse className={classes.expandableContent} in={expanded} timeout="auto" unmountOnExit>
            <Grid container alignItems="center">
              <Typography color="textSecondary" className={classes.smallRightPadding}>User ID:</Typography>
              <Typography>{user_id}</Typography>  
            </Grid>
            <Grid container alignItems="center">
              <Typography color="textSecondary" className={classes.smallRightPadding}>Address ID:</Typography>
              <Typography>{id}</Typography>  
            </Grid>
            <Grid container alignItems="center">
              <Typography color="textSecondary" className={classes.smallRightPadding}>Created At:</Typography>
              <Typography>{created_at}</Typography>  
            </Grid>
            <Grid container alignItems="center">
              <Typography color="textSecondary" className={classes.smallRightPadding}>Updated At:</Typography>
              <Typography>{updated_at}</Typography>  
            </Grid>
          </Collapse>
        </CardContent>
        <CardActions>
          <Button onClick={handleExpandClick} size="small">{expanded ? 'See Less' : 'See More'}</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default AddressInformationCard
