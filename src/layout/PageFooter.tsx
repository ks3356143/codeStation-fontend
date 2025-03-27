import React from "react"

type Props = {}

const PageFooter = (props: Props) => {
	return (
		<div
			className="page-footer-container"
			style={{
				color: "#8c8c8c",
				display: "flex",
				flexDirection: "column",
				gap: "5px",
			}}
		>
			<div>您是否喜欢该平台 ★ 请提出您宝贵的意见</div>
			<div>@{new Date().getFullYear()} - CodeStation</div>
			<div>Created By Microsat</div>
		</div>
	)
}

export default PageFooter
