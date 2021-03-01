import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { PageHeader, Row, Col, Layout, Breadcrumb, BackTop } from 'antd'
import { LeftOutlined, UpOutlined } from '@ant-design/icons'
import styles from '../styles/Layout.module.scss'

const { Content } = Layout

interface IProps {
	children: JSX.Element,
	title: string
}

export default function PageLayout({children, title}: IProps) {
	const {pathname} = useLocation()
	const history = useHistory()
	const [isHomePage, setIsHomePage] = useState(pathname === "/")

	useEffect(() => {
		setIsHomePage(pathname === '/')
	}, [pathname])

	function onBackClick() {
		history.goBack()
	}

    return (
		<Layout className={styles.page}>
			<PageHeader
				className={styles.pageHeader}
				title={title}
				onBack={onBackClick}
				backIcon={!isHomePage ? <LeftOutlined /> : false}
			/>
			<Content className={`${styles.layoutContent} ${title.toLowerCase().split(' ').join('-')}-page`}>
				{!isHomePage && (
					<Row>
						<Col span={24}>
							<Breadcrumb className={styles.breadcrumb}>
								<Breadcrumb.Item>
									<Link to='/'>Home</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item>Character</Breadcrumb.Item>
							</Breadcrumb>
						</Col>
					</Row>
				)}
				<Row>
					<Col span={24}>
						<div className={styles.pageContent}>{children}</div>
					</Col>
				</Row>
			</Content>
			<BackTop>
				<div className={styles.backTop}>
					<UpOutlined />
				</div>
			</BackTop>
		</Layout>
	)
}
