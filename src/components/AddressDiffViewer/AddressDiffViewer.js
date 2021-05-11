import { useState } from 'react'
import { useApi } from '../../hooks'
import { Select, MenuItem } from '@material-ui/core';

const AddressDiffViewer = () => {
  // Fetch the userIds on mounted
  const [{ data: userIds, isLoading, isError }, executeFetch] = useApi('http://localhost:5000/user_ids')
  const [selectedUser, setSelectedUser] = useState('')

  // TODO - Handle loading and error states

  return (
    <div className="App">
      <Select value={selectedUser} onChange={setSelectedUser}>
        {userIds.map(userId => <MenuItem key={userId} value={userId}>{userId}</MenuItem>)}
      </Select>
    </div>
  )
}

export default AddressDiffViewer;
