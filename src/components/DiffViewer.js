import { useHistory, useLocation } from 'react-router-dom'
import { Button, Grid, Card, Typography, CardContent } from '@material-ui/core'

const DiffViewer = () => {
  const history = useHistory()
  const location = useLocation()

  const handleBackClick = () => {
    history.goBack()
  }

  console.log(location.state)

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Button onClick={handleBackClick}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default DiffViewer
