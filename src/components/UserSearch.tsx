import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchGithubUser } from '../api/github'
import UserCard from './UserCard'

const UserSearch = () => {
	const [username, setUsername] = useState('')
	const [submittedUsername, setSubmittedUsername] = useState('')

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['user', submittedUsername],
		queryFn: () => fetchGithubUser(submittedUsername),
		enabled: !!submittedUsername,
	})

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSubmittedUsername(username.trim())
	}

	return (
		<>
			<form className='form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Enter GitHub username...'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<button type='submit'>Search</button>
			</form>
			{isLoading && <p className='status'>Loading...</p>}
			{isError && <p className='status error'>{(error as Error).message}</p>}

			{data && <UserCard key={data.id} user={data} />}
		</>
	)
}

export default UserSearch
