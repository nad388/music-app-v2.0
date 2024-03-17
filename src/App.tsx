import { FC } from 'react'
import Playbar from './components/Playbar/Playbar'
import styles from './global.module.scss'
import MainPage from './pages/MainPage/MainPage'

// import axios from 'axios'

// const API_BASE_URL = 'https://516c9b9d82ee76a0.mokky.dev'

// const getTracks = async () => {
// 	const response = await axios.get(`${API_BASE_URL}/tracks`)
// 	console.log(response.data)
// }
// getTracks()
const App: FC = () => {
	return (
		<div className={styles.wrapper}>
			<MainPage />
			<Playbar />
		</div>
	)
}

export default App
