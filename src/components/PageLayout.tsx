import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Row, Col, Layout, Breadcrumb, BackTop, Button, Tooltip } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import styles from '../styles/Layout.module.scss'

const { Content } = Layout

interface IProps {
	children: JSX.Element
}

export default function PageLayout({children}: IProps) {
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
			<Content className={styles.layoutContent}>
				{!isHomePage && (
					<Row>
						<Col span={24}>
							<Tooltip title='Back'>
								<Button
									onClick={onBackClick}
									type='primary'
									shape='circle'
									icon={<LeftOutlined />}
								/>
							</Tooltip>
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
				<div className={styles.backTop}>UP</div>
			</BackTop>
		</Layout>
	)
}
