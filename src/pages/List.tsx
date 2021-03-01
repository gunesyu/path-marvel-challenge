import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { List, Avatar, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { IListState } from '../store/models'
import ICharacter from '../data/ICharacter'
import { getCharacters } from '../data/marvelAPI'
import { setPageCount } from '../store/actions'
import PageLayout from '../components/PageLayout'
import Loading from '../components/Loading'


export default function ListPage() {
	const [listData, setListData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
	const [hasMoreData, setHasMoreData] = useState(true)

	const {pageCount, limit} = useSelector((state: { list: IListState }) => state.list)
	const dispatch = useDispatch()

	useEffect(() => {
        getCharacters().then((response) => {
			setListData(response.results)
		})
	}, [])

	const handleInfiniteOnLoad = () => {
        setLoading(true)
        const newOffset = pageCount * limit
        getCharacters(newOffset).then((response) => {
			setListData((prevListData) => prevListData.concat(response.results))
			setLoading(false)
			dispatch(setPageCount(pageCount + 1))
			setHasMoreData(newOffset < response.total)
		})
	}

	return (
		<PageLayout>
			{!listData ? (
				<Loading />
			) : (
				<InfiniteScroll
					dataLength={listData.length}
					loader={<Loading />}
					next={handleInfiniteOnLoad}
					hasMore={hasMoreData}>
					<List
						dataSource={listData}
						renderItem={(item: ICharacter) => (
							<List.Item key={item.id}>
								<Link to={`/character/${item.id}`}>
									<List.Item.Meta
										avatar={
											<Avatar
												src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
											/>
										}
										title={item.name}
									/>
									<div>{item.name}</div>
								</Link>
							</List.Item>
						)}>
						{loading && hasMoreData && <Spin />}
					</List>
				</InfiniteScroll>
			)}
		</PageLayout>
	)
}
