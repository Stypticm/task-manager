import { useQuery } from '@apollo/client'
import { QUERY_GET_USERS } from '../graphql/queries/query_getusers'
import { Button } from 'antd'
import { Link } from 'react-router-dom'


const UsersPage = () => {
  const { loading, error, data } = useQuery(QUERY_GET_USERS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (data) {
    console.log(data)
  }

  return (
    <>
      <Button>
        <Link to="/">
          Login
        </Link>
      </Button>
      {
        data.users.map((user: any) => (
          <p key={user._id}>{user.username}</p>
        ))
      }
    </>
  )
}

export default UsersPage