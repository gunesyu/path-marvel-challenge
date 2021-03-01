import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'antd'
import { useDispatch } from 'react-redux'
import { setCharId } from '../store/actions'
import ICharacter from '../data/ICharacter'
import { getCharacterDetails } from '../data/marvelAPI'
import Loading from '../components/Loading'
import PageLayout from '../components/PageLayout'


export default function Details() {
	let { id } = useParams<{id: string}>()

	const [detailsData, setDetailsData] = useState<ICharacter>()

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCharId(id))
		getCharacterDetails(id).then((res) => {
			setDetailsData(res)
		})
	}, [id, dispatch])

	return (
		<PageLayout>
			{!detailsData ? (
				<Loading />
			) : (
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt={detailsData.name}
							src={`${detailsData.thumbnail.path}.${detailsData.thumbnail.extension}`}
						/>
					}>
					<Card.Meta
						title={detailsData.name}
						description={detailsData.description}
					/>
				</Card>
			)}
		</PageLayout>
	)
}
