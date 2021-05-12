import { FormControl, InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  idSelect: {
    width: '100%'
  }
})

const EventCard = ({ label, value, options, onInputChange }) => {
  const classes = useStyles()

  return (
    <FormControl variant="filled" className={classes.idSelect}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={event => onInputChange(event.target.value)}>
        {!!options.length 
          ? options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>) 
          : <MenuItem value={""}>No results</MenuItem>
        }
      </Select>
    </FormControl>
  )
}

export default EventCard
