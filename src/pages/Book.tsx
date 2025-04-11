import LazyImage from "@/components/atomics/LazyImage"

const Book = () => {
	return (
		<div
			style={{
				display: "flex",
				margin: "50px auto",
				flexDirection: "column",
				gap: "30px",
				width: "100%",
			}}
		>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
			<LazyImage src="https://picsum.photos/200/100"></LazyImage>
		</div>
	)
}

export default Book
