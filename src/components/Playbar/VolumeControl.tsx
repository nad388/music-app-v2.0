import { useContext } from 'react'
import { BsVolumeDown, BsVolumeMute } from 'react-icons/bs'
import { AudioContext } from '../../context/AudioContext'

const VolumeControl = () => {
	const { volume, handleVolumeChange } = useContext(AudioContext)
	const isMuted = volume === 0 // Check if volume is muted (0)
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{ marginRight: '5px' }}>
				{isMuted ? <BsVolumeMute size={30} /> : <BsVolumeDown size={30} />}
			</div>
			<input
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
