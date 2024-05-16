import { IconButton, Slider } from '@mui/material'
import { FC, useContext, useEffect, useState } from 'react'
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs'
import { AudioContext } from '../../context/AudioContext'
import secondsToMMSS from '../../utils/secondsToMMSS'
import styles from './Playbar.module.scss'
import RandomPlay from './RandomPlay'
import VolumeControl from './VolumeControl'

const TimeControls = () => {
	const { audio, currentTrack } = useContext(AudioContext)
	if (!currentTrack) {
		return null
	}
	const { duration } = currentTrack
	const [currentTime, setCurrentTime] = useState(0)
	const formattedCurrentTime = secondsToMMSS(currentTime)
	const sliderCurrentTime = Math.round((currentTime / duration) * 100)

	const handleChangeCurrentTime = (_: any, value: any) => {
		const time = Math.round((value / 100) * duration)

		setCurrentTime(time)
		audio.currentTime = time
	}
	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(audio.currentTime)
		}, 1000)
		return () => {
			clearInterval(timeInterval)
		}
	}, [])

	return (
		<>
			<p>{formattedCurrentTime}</p>
			<Slider
				sx={{ width: '350px' }}
				step={1}
				min={1}
				max={100}
				value={sliderCurrentTime}
				onChange={handleChangeCurrentTime}
			/>
		</>
	)
}

const Playbar: FC = () => {
	const { currentTrack, handleToggleAudio, isPlaying } =
		useContext(AudioContext)
	if (!currentTrack) {
		return <div>Error!</div>
	}
	const { title, artists, preview, duration } = currentTrack
	const formattedDuration = secondsToMMSS(duration)

	return (
		<div className={styles.playbar}>
			<img className={styles.preview} src={preview} alt='' />
			<IconButton onClick={() => handleToggleAudio(currentTrack)}>
				{isPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
			</IconButton>

			<div className={styles.credits}>
				<h4>{title}</h4>
				<p>{artists}</p>
			</div>
			<div>
				<VolumeControl />
			</div>
			<RandomPlay />

			<div className={styles.slider}>
				<TimeControls />
				<p>{formattedDuration}</p>
			</div>
		</div>
	)
}

export default Playbar
