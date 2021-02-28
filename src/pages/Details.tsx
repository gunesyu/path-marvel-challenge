import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'antd'
import ICharacter from '../data/ICharacter'
import IMarvelResponse from '../data/IMarvelResponse'
import API from '../data/marvelAPI'
import Loading from '../components/Loading'
import PageLayout from '../components/PageLayout'


export default function Details() {
	let { id } = useParams<{id: string}>()

	const [detailsData, setDetailsData] = useState<ICharacter>()

	useEffect(() => {
		API.get<any, IMarvelResponse>(`/characters/${id}`).then((res) => {
			const result = res.results.pop()
			setDetailsData(result)
		})
	}, [])

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
