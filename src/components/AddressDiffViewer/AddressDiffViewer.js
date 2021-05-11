import { useApi } from '../../hooks'
import { Button } from '@material-ui/core';

const AddressDiffViewer = () => {
  const [{ data, isLoading, isError }, executeFetch] = useApi('https://cataas.com/cat')

  return (
    <div className="App">
      <Button color="primary" onClick={executeFetch}>Get a cat!</Button>
    </div>
  )
}

export default AddressDiffViewer;
