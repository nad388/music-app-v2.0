import { ChangeEvent, FC, useEffect, useState } from 'react'
import TrackItem from '../../components/TrackList/TrackItem'
import { ITrack } from '../../types/types.ts'
import { fetchTracksFromApi } from '../../utils/apiUtils.ts'
import styles from './MainPage.module.scss'

const MainPage: FC = () => {
	const [tracks, setTracks] = useState<ITrack[]>([])
	const [originalTracks, setOriginalTracks] = useState<ITrack[]>([])

	useEffect(() => {
		const fetchTracks = async () => {
			const response = await fetchTracksFromApi()
			setTracks(response)
			setOriginalTracks(response) // сохраняем оригинальный список
		}
		fetchTracks()
	}, [])

	const runSearch = (query: string) => {
		if (!query) {
			return originalTracks // возвращаем оригинальный список, если запрос пустой
		}
		const lowerCaseQuery = query.toLowerCase()
		return originalTracks.filter(
			track =>
				track.title.toLowerCase().includes(lowerCaseQuery) ||
				track.artists.toLowerCase().includes(lowerCaseQuery)
		)
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const foundTracks = runSearch(event.target.value)
		return setTracks(foundTracks)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.search}>
				<input
					className={styles.input}
					placeholder='Search tracks'
					onChange={handleChange}
				/>
			</div>
			<div className={styles.list}>
				{tracks.map(track => (
					<TrackItem key={track.id} {...track} />
				))}
			</div>
		</div>
	)
}

export default MainPage
