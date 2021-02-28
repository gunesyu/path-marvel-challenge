import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Row, Col, Layout, Breadcrumb, BackTop } from 'antd'
import styles from '../styles/Layout.module.scss'

const { Content } = Layout

interface IProps {
	children: JSX.Element
}

export default function PageLayout({children}: IProps) {
	const {pathname} = useLocation()
	const [showBreadcrumb, setShowBreadcrumb] = useState(pathname !== "/")

	useEffect(() => {
		setShowBreadcrumb(pathname !== '/')
	}, [pathname])

    return (
		<Layout className={styles.page}>
			<Content className={styles.layoutContent}>
				{showBreadcrumb && (
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
				<div className={styles.backTop}>UP</div>
			</BackTop>
		</Layout>
	)
}
