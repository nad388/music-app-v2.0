import axios from 'axios'

const API_BASE_URL = 'https://516c9b9d82ee76a0.mokky.dev'

export const getTracks = async () => {
	const response = await axios.get(`${API_BASE_URL}/tracks`)
	return response.data
}
