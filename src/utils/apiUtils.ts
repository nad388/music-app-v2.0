import * as api from '../assets/api/api.ts'

export const fetchTracksFromApi = async () => {
	const response = await api.getTracks()
	return response
}
