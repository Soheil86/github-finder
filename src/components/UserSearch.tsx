import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { fetchGithubUser, searchGithubUser } from '../api/github'
import UserCard from './UserCard'
import RecentSearches from './RecentSearches'
import SuggestionDropdown from './SuggestionDropdown'
import { useDebounce } from 'use-debounce'

const UserSearch = () => {
	const [username, setUsername] = useState('')
	const [submittedUsername, setSubmittedUsername] = useState('')
	const [recentUsers, setRecentUsers] = useState<string[]>(() => {
		const stored = localStorage.getItem('recentUsers')
		return stored ? JSON.parse(stored) : []
	})
	const [debounceUsername] = useDebounce(username, 300)
	const [showSuggestions, setShowSuggestions] = useState(false)

	// Query to fetch specific user
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryKey: ['user', submittedUsername],
		queryFn: () => fetchGithubUser(submittedUsername),
		enabled: !!submittedUsername,
	})

	// Query to fetch suggestions for user search
	const { data: suggestions } = useQuery({
		queryKey: ['github-user-suggestions', debounceUsername],
		queryFn: () => searchGithubUser(debounceUsername),
		enabled: debounceUsername.length > 1,
	})

	// Put the user at the top of recent searches, without duplicates, max 5
	const addToRecentUsers = (login: string) => {
		setRecentUsers((prev) => {
			const updated = [login, ...prev.filter((u) => u !== login)]
			return updated.slice(0, 5)
		})
	}

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()
		const trimmed = username.trim()
		if (!trimmed) return
		setSubmittedUsername(trimmed)
		setUsername('')
		addToRecentUsers(trimmed)
	}

	const handleSelectSuggestion = (login: string) => {
		setUsername(login)
		setShowSuggestions(false)
		if (submittedUsername !== login) {
			setSubmittedUsername(login)
		} else {
			refetch()
		}
		addToRecentUsers(login)
	}

	useEffect(() => {
		localStorage.setItem('recentUsers', JSON.stringify(recentUsers))
	}, [recentUsers])

	return (
		<>
			<form className='form' onSubmit={handleSubmit}>
				<div className='dropdown-wrapper'>
					<input
						type='text'
						placeholder='Enter GitHub username...'
						value={username}
						onChange={(e) => {
							const val = e.target.value
							setUsername(val)
							setShowSuggestions(val.trim().length > 1)
						}}
					/>
					<SuggestionDropdown
						suggestions={suggestions ?? []}
						show={showSuggestions}
						onSelect={handleSelectSuggestion}
					/>
				</div>
				<button type='submit'>Search</button>
			</form>
			{isLoading && <p className='status'>Loading...</p>}
			{isError && <p className='status error'>{(error as Error).message}</p>}

			{data && <UserCard key={data.id} user={data} />}

			{recentUsers.length > 0 && (
				<RecentSearches
					users={recentUsers}
					onSelect={(user) => {
						setUsername(user)
						setSubmittedUsername(user)
					}}
				/>
			)}
		</>
	)
}

export default UserSearch
