import { useContext } from 'react'
import { FaRandom } from 'react-icons/fa'
import { AudioContext } from '../../context/AudioContext'
import styles from './RandomPlay.module.scss'

const RandomPlay = () => {
	const { isRandomMode, toggleRandomMode } = useContext(AudioContext)

	const handleRandomModeToggle = () => {
		toggleRandomMode()
	}
	return (
		<div
			className={`${styles.randomPlay} ${isRandomMode ? styles.active : ''}`}
			onClick={handleRandomModeToggle}
		>
			<FaRandom size={'18px'} color='#9340fe' />
		</div>
	)
}

export default RandomPlay
