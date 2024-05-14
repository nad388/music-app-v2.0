import {
	Context,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { ITrack } from '../types/types'
import { fetchTracksFromApi } from '../utils/apiUtils.ts'

interface IAudioContext {
	audio: HTMLAudioElement
	currentTrack: ITrack | null
	isPlaying: boolean
	volume: number
	isRandomMode: boolean
	handleToggleAudio: (track: ITrack) => void
	handleVolumeChange: (newVolume: number) => void
	toggleRandomMode: () => void // Function to toggle random mode
}

const audio = new Audio()

export const AudioContext: Context<IAudioContext> = createContext(
	{} as IAudioContext
)

const AudioProvider = ({ children }: PropsWithChildren<{}>) => {
	const [tracksList, setTracks] = useState<ITrack[]>([])
	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isTrackPlaying, setIsTrackPlaying] = useState(false)
	const [volume, setVolume] = useState(0.5) // Initial volume at 50%
	const [isRandomMode, setIsRandomMode] = useState(false) // Initial random mode off

	useEffect(() => {
		const fetchTracks = async () => {
			const response = await fetchTracksFromApi()
			setTracks(response)
			setCurrentTrack(response[0])
		}
		fetchTracks()
	}, [])

	useEffect(() => {
		const handleEnded = () => {
			if (!isRandomMode) {
				const currentIndex = tracksList.findIndex(
					track => track.id === currentTrack?.id
				)
				if (currentIndex !== -1 && currentIndex < tracksList.length - 1) {
					setCurrentTrack(tracksList[currentIndex + 1])
					setIsPlaying(true)
					setIsTrackPlaying(false)
				}
			} else {
				const randomIndex = Math.floor(Math.random() * tracksList.length)
				setCurrentTrack(tracksList[randomIndex])
				setIsPlaying(true)
				setIsTrackPlaying(false)
			}
		}
		audio.addEventListener('ended', handleEnded)

		return () => {
			audio.removeEventListener('ended', handleEnded)
		}
	}, [currentTrack, tracksList, isRandomMode])

	useEffect(() => {
		if (currentTrack && isPlaying && !isTrackPlaying) {
			setCurrentTrack(currentTrack)
			setIsTrackPlaying(true)
			audio.src = currentTrack.src
			audio.volume = volume
			audio.play()
		}
	}, [currentTrack, isPlaying, isTrackPlaying, volume])

	const handleVolumeChange = (newVolume: number) => {
		setVolume(newVolume)
		audio.volume = newVolume // Update audio volume
	}

	const handleToggleAudio = (track: ITrack) => {
		if (!currentTrack || currentTrack.id !== track.id) {
			setCurrentTrack(track)
			setIsPlaying(true)
			setIsTrackPlaying(false) // Сброс флага воспроизведения для нового трека
			audio.src = track.src
			audio.currentTime = 0
			return
		}

		if (isPlaying) {
			audio.pause()
			setIsPlaying(false)
		} else {
			audio.play()
			setIsPlaying(true)
		}
	}

	const toggleRandomMode = () => {
		setIsRandomMode(!isRandomMode)
	}

	const value = {
		audio,
		currentTrack,
		isPlaying,
		handleToggleAudio,
		volume,
		handleVolumeChange,
		isRandomMode,
		toggleRandomMode,
	}
	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
export default AudioProvider
