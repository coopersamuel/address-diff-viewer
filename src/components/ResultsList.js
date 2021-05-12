import { cloneElement } from 'react'
import { Grid, Typography, Box, CircularProgress } from '@material-ui/core'

/**
 * A generic component for rendering a list of results,
 * handling loading, error and no results states as well
 */
const ResultsList = ({ 
  results, 
  isLoading, 
  isError, 
  errorText,
  noResultsText,
  resultComponent,
  onResultClick
}) => {
  const renderResults = () => {
    // Handle rendering for loading, error and no results states
    if (isLoading) {
      return (
        <Grid container justify="center">
          <CircularProgress size={30} />
        </Grid>
      )
    } else if (isError) {
      return (
        <Typography variant="subtitle2" color="error">
          {errorText}
        </Typography>
      )
    } else if (!results.length) {
      return (
        <Typography variant="subtitle2">
          {noResultsText}
        </Typography>
      )
    } else {
      // Render a list of 
      return results.map(result => {
        return (
          <Box key={result.id} mb="10px" onClick={() => onResultClick(result.id)}>
            {cloneElement(resultComponent, { data: result })}
          </Box>
        )
      })
    }
  }

  return (
    <div>
      {renderResults()}
    </div>
  )
}

export default ResultsList
