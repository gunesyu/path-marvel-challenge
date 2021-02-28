import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'
import ICharacter from '../data/ICharacter'
import IMarvelResponse from '../data/IMarvelResponse'
import {getCharacters} from '../data/marvelAPI'
import { Link } from 'react-router-dom'
import { List, Avatar, Spin } from 'antd'
import PageLayout from '../components/PageLayout'


export default function ListPage() {
	const [listData, setListData] = useState<any[]>([])
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(false)

	useEffect(() => {
        getCharacters()
            .then(response => {
                setListData(response.results)
            })
	}, [])

	const hasMore = true
	const handleInfiniteOnLoad = () => {
        setLoading(true)
        const offset = pageCount * 30
        getCharacters(offset).then((response) => {
			setListData((prevListData) => prevListData.concat(response.results))
            setLoading(false)
            setPageCount((prevPageCount) => prevPageCount + 1)
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
					hasMore={hasMore}>
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
						{loading && hasMore && (
							<div className='demo-loading-container'>
								<Spin />
							</div>
						)}
					</List>
				</InfiniteScroll>
			)}
		</PageLayout>
	)
}
