import bookApi from "@/api/system/book";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { useStoreSelector } from "@/store/hooks";
import { useState } from "react";
import type { BookInfo } from "@/components/issueComponents/IssueItem/types";
import { toast } from "react-toastify";
import ContentHeader from "@/components/ContentHeader";
import styles from "./bookDetail.module.css";
import LaztImage from "@/components/atomics/LazyImage";
import Discuss from "@/components/issueComponents/Discuss";
import { Modal } from "antd";
import img1 from "@/asserts/imgs/imageQs.png";
import ReactMarkdown from "react-markdown";

const BookDetail = () => {
  // book信息
  const loaderData = useLoaderData() as BookInfo;
  // 用户信息和登录状态
  const { userInfo, isLogin } = useStoreSelector((state) => state.user);
  // 下载modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => {
    // 确定下载-判断积分是否足够
    if (Number(userInfo.points) - loaderData.requirePoints < 0) {
      toast.error("您的积分不足");
    } else {
      // 积分足够
      toast.success("积分满足，正在跳转连接...");
      window.open(`${loaderData.downloadLink}`);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <ContentHeader title="书籍详情" />
      <div className={styles.bookInfoContainer}>
        <div className={styles.leftSide}>
          <div className={styles.img}>
            <LaztImage
              width={280}
              height={350}
              src={loaderData.picture ? `${import.meta.env.VITE_APP_BASE_URL.replace("/api", "")}${loaderData.picture}` : img1}
            />
          </div>
          <div className={styles.link}>
            <span>
              下载所需积分: <span className={styles.requirePoints}>{loaderData?.requirePoints}</span> 分
            </span>
            {isLogin ? (
              <div className={styles.downloadLink} onClick={showModal}>
                百度云下载地址
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.title}>{loaderData?.title}</h1>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  style={{
                    fontSize: "2em",
                    color: "#333",
                    borderBottom: "2px solid #eee",
                    padding: "0.3em 0",
                    margin: "1em 0",
                  }}
                >
                  {props.children}
                </h1>
              ),
              h2: ({ node, ...props }) => (
                <h1
                  style={{
                    fontSize: "1.8em",
                    color: "#333",
                    borderBottom: "2px solid #eee",
                    padding: "0.3em 0",
                    margin: "1em 0",
                  }}
                >
                  {props.children}
                </h1>
              ),
              // 自定义 h3 标题的渲染
              h3: ({ node, ...props }) => (
                <h3
                  style={{
                    fontSize: "1.5em",
                    color: "#333",
                    borderBottom: "2px solid #eee",
                    padding: "0.3em 0",
                    margin: "1em 0",
                  }}
                >
                  {props.children}
                </h3>
              ),
              // 自定义 h4 标题的渲染
              h4: ({ node, ...props }) => (
                <h4
                  style={{
                    fontSize: "1.3em",
                    color: "#333",
                    borderBottom: "2px solid #eee",
                    padding: "0.3em 0",
                    margin: "1em 0",
                  }}
                >
                  {props.children}
                </h4>
              ),
              // 自定义 h5 标题的渲染
              h5: ({ node, ...props }) => (
                <h5
                  style={{
                    fontSize: "1.1em",
                    color: "#333",
                    borderBottom: "2px solid #eee",
                    padding: "0.3em 0",
                    margin: "1em 0",
                  }}
                >
                  {props.children}
                </h5>
              ),
            }}
          >
            {loaderData?.bookInfo || ""}
          </ReactMarkdown>
        </div>
      </div>
      <div className={styles.comment}>
        <Discuss commentType={2} targetId={loaderData.id} type_id={[loaderData.type.id] as any} />
      </div>
      <Modal title="重要提示" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          是否使用 <span className={styles.requirePoints}>{loaderData?.requirePoints}</span> 积分下载此书籍？
        </p>
      </Modal>
    </div>
  );
};

// loader
export const loader = async ({ params }: LoaderFunctionArgs): Promise<{ data: BookInfo }> => {
  const book_id = params.bookId;
  const { data } = await bookApi.getOneBook(book_id);
  return data;
};

export default BookDetail;
