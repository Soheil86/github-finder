export const fetchGithubUser = async (userName: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/users/${userName}`,
	)
	if (!response.ok) {
		throw new Error('User not found')
	}
	return response.json()
}

export const searchGithubUser = async (query: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`,
	)
	if (!response.ok) {
		throw new Error('User not found')
	}
	const data = await response.json()
	return data.items
}
