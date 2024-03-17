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
	handleToggleAudio: (track: ITrack) => void
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
			const currentIndex = tracksList.findIndex(
				track => track.id === currentTrack?.id
			)
			if (currentIndex !== -1 && currentIndex < tracksList.length - 1) {
				setCurrentTrack(tracksList[currentIndex + 1])
				setIsPlaying(true)
				setIsTrackPlaying(false)
			}
		}
		audio.addEventListener('ended', handleEnded)

		return () => {
			audio.removeEventListener('ended', handleEnded)
		}
	}, [currentTrack, tracksList])

	useEffect(() => {
		if (currentTrack && isPlaying && !isTrackPlaying) {
			setCurrentTrack(currentTrack)
			setIsTrackPlaying(true)
			audio.src = currentTrack.src
			audio.play()
		}
	}, [currentTrack, isPlaying, isTrackPlaying])

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
	const value = {
		audio,
		currentTrack,
		isPlaying,
		handleToggleAudio,
	}
	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
export default AudioProvider
