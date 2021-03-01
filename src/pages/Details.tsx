import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Card, List, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { IDetailState } from '../store/models'
import { setCharId } from '../store/actions'
import ICharacter from '../data/ICharacter'
import IComic from '../data/IComic'
import { getCharacterDetails } from '../data/marvelAPI'
import Loading from '../components/Loading'
import PageLayout from '../components/PageLayout'

export default function Details() {
	let { id } = useParams<{ id: string }>()

	const [detailsData, setDetailsData] = useState<ICharacter>()

	const { detailList } = useSelector(
		(state: { details: IDetailState }) => state.details
	)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setCharId(id))
		getCharacterDetails(id).then((res) => {
			setDetailsData(res)
		})
	}, [id, dispatch])

	return (
		<PageLayout title='Details'>
			{!detailsData ? (
				<Loading />
			) : (
				<Row gutter={30}>
					<Col md={6} xs={24} sm={12}>
						<Card
							cover={
								<img
									alt={detailsData.name}
									src={`${detailsData.thumbnail.path}.${detailsData.thumbnail.extension}`}
								/>
							}>
							<Card.Meta title={detailsData.name} />
							{detailsData.description}
						</Card>
					</Col>
					{detailList.length > 0 ? (
						<Col md={18} xs={24} sm={12}>
							<List
								dataSource={detailList}
								renderItem={(item: IComic) => (
									<List.Item key={item.id}>
										<List.Item.Meta
											avatar={
												<Avatar
													src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
												/>
											}
											title={item.title}
											description={item.description}
										/>
									</List.Item>
								)}></List>
						</Col>
					) : null}
				</Row>
			)}
		</PageLayout>
	)
}
