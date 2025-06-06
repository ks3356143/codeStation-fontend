import { Image } from "antd"
import { ImageProps } from "antd/es/image"
import lazyImg from "@/asserts/imgs/lazy.gif"
import { useEffect, useRef, useState } from "react"
import styles from "./index.module.less"

interface Props extends ImageProps {
	// 自己新增属性
}

/**
 * 基于antd的Image组件设计的懒加载图片
 */
const LaztImage = (props: Props) => {
	// 获取img元素
	const imgRef = useRef<HTMLDivElement>(null)
	// 解构出src出来不传入Image组件
	const { src, ...restProps } = props
	// 图片状态
	const [imageSrc, setImageSrc] = useState(lazyImg)
	// effect判断
	useEffect(() => {
		if (!imgRef.current) return
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						// 为了防止频繁触发，判断当现在src等于传入的则不set，注意set特性
						// set特性：直接set会使react合并异步，所以使用函数形式
						setImageSrc(preSrc => {
							if (preSrc !== src) {
								return src!
							}
							// 取消观察
							observer.observe(entry.target)
							return preSrc
						})
					}
				})
			},
			{
				threshold: 0.2, // 与视口交叉20%则触发回调
			}
		)
		if (imgRef.current) observer.observe(imgRef.current)
		// 清理函数
		return () => {
			if (observer && imgRef.current) {
				observer.unobserve(imgRef.current!)
			}
		}
	}, [src])
	return (
		<div ref={imgRef} className={styles.lazydiv}>
			<Image src={imageSrc} {...restProps}></Image>
		</div>
	)
}

export default LaztImage
