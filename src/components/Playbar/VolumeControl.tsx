import { useContext, useEffect, useRef } from 'react'
import { BsVolumeDown, BsVolumeMute } from 'react-icons/bs'
import { AudioContext } from '../../context/AudioContext'
// import styles from './VolumeControl.module.scss'

const VolumeControl = () => {
	const { volume, handleVolumeChange } = useContext(AudioContext)
	const isMuted = volume === 0 // Check if volume is muted (0)
	const rangeRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const range = rangeRef.current
		if (!range) return // Проверка наличия элемента
		const updateBackground = () => {
			const min = Number(range.min)
			const max = Number(range.max)
			const currentVal = Number(range.value)
			range.style.backgroundSize =
				((currentVal - min) / (max - min)) * 100 + '% 100%'
		}
		updateBackground()
		range.addEventListener('input', updateBackground)
		return () => {
			range.removeEventListener('input', updateBackground)
		}
	}, [])

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{ marginRight: '5px', marginTop: '3px' }}>
				{isMuted ? <BsVolumeMute size={30} /> : <BsVolumeDown size={30} />}
			</div>
			<input
				ref={rangeRef}
				className='range'
				style={{ width: '100px' }}
				type='range'
				min='0'
				max='1'
				step='0.01'
				value={volume}
				onChange={e => handleVolumeChange(parseFloat(e.target.value))}
			/>
		</div>
	)
}
export default VolumeControl
