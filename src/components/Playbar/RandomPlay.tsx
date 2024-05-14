import { useContext } from 'react'
import { FaRandom } from 'react-icons/fa'
import { AudioContext } from '../../context/AudioContext'
import styles from './Playbar.module.scss'

const RandomPlay = () => {
	const { isRandomMode, toggleRandomMode } = useContext(AudioContext)

	const handleRandomModeToggle = () => {
		toggleRandomMode()
	}
	return (
		<div className={styles.randomPlay}>
			<FaRandom
				size={'18px'}
				onClick={handleRandomModeToggle}
				color={isRandomMode ? 'blue' : 'white'}
			/>
		</div>
	)
}

export default RandomPlay
