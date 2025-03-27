import { Col, Row, Spin } from "antd"

const LazyLoading = () => {
	return (
		<Row align="middle" justify="center" style={{ minHeight: "100%" }}>
			<Col>
				<Spin spinning></Spin>
			</Col>
		</Row>
	)
}

export default LazyLoading
