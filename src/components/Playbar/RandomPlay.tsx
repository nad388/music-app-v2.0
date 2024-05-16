import { useContext } from 'react'

import { Shuffle } from 'lucide-react'
import { AudioContext } from '../../context/AudioContext'
import styles from './RandomPlay.module.scss'

const RandomPlay = () => {
	const { isRandomMode, toggleRandomMode } = useContext(AudioContext)

	const handleRandomModeToggle = () => {
		toggleRandomMode()
	}

	return (
		<div className={styles.randomPlay} onClick={handleRandomModeToggle}>
			{isRandomMode ? (
				<Shuffle size={'20px'} color='#9340fe' />
			) : (
				<Shuffle size={'20px'} color='white' />
			)}
		</div>
	)
}

export default RandomPlay
