// Related third party imports.
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import {
  Upload,
  Form,
  Radio,
  InputNumber,
  Layout,
  Typography,
  Table,
  Button,
  Modal,
  FloatButton,
  Input,
  DatePicker,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { getDocs, addDoc, Timestamp } from "firebase/firestore/lite";
import dayjs from "dayjs";
// import { getDownloadURL, list, ref } from "firebase/storage";
import // signInWithPopup,
// signInWithRedirect,
// GoogleAuthProvider,
// getAdditionalUserInfo,
// getRedirectResult,
// signOut,
"firebase/auth";
// import { FirebaseError } from "firebase/app";

// Local application/library specific imports.
import setVh from "../utils/setVh";
import styles from "./index.module.css";
import type {
  BeefNoodleComment,
  BeefNoodleCommentFromFirestore,
} from "../types";
import GlobalContext from "../contexts/GlobalContext";
import ImageDialogCarousel from "../components/ImageDialogCarousel";

// Stateless vars declare.
const ADD_DOC_FAILED = "ADD_DOC_FAILED" as const;
const today = dayjs();
const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export default Home;

function Home() {
  const [commentModalOpen, toggleCommentModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<BeefNoodleComment[]>([]);
  const [beefCommentForm] = Form.useForm();
  const [visitDate, setVisitDate] = useState(today);
  const [addCommentLoading, toggleAddCommentLoading] = useState(false);
  const { collectionRef, auth, googleAuthProvider } = useContext(GlobalContext);
  const [notificationIns, Notification] = notification.useNotification();
  const columns: ColumnsType<BeefNoodleComment> = [
    {
      title: "分數",
      dataIndex: "score",
      width: 100,
      sorter: (a, b) => a.score - b.score,
      render: (val: BeefNoodleComment["score"]) => (
        <b className={styles.scoreTCell} style={{ color: "red" }}>
          {val}
        </b>
      ),
    },
    {
      title: "店名",
      dataIndex: "storeName",
      width: 150,
    },
    {
      title: "造訪日期",
      dataIndex: "visitDate",
      width: 100,
      defaultSortOrder: "ascend",
      sorter: (a, b) =>
        Date.parse(a.visitDate.toISOString()) -
        Date.parse(b.visitDate.toISOString()),
      render: (val: BeefNoodleComment["visitDate"]) => val.toLocaleDateString(),
    },
    {
      title: "品項",
      dataIndex: "itemName",
      width: 100,
    },
    {
      title: "價格",
      dataIndex: "itemPrice",
      width: 100,
      render: (val: BeefNoodleComment["itemPrice"]) => `$${val}`,
    },
    {
      title: "圖片",
      dataIndex: "images",
      width: 110,
      render: (val: BeefNoodleComment["images"], record) => (
        <ImageDialogCarousel beefNoodleComment={record} />
      ),
    },
    {
      title: "麵條分數",
      dataIndex: "noodleScore",
      width: 100,
      sorter: (a, b) => (a.noodleScore || 0) - (b.noodleScore || 0),
      render: (val: BeefNoodleComment["noodleScore"]) => (
        <b className={styles.scoreTCell}>{val}</b>
      ),
    },
    {
      title: "麵條描述",
      dataIndex: "noodleDescription",
      width: 300,
    },
    {
      title: "牛肉分數",
      dataIndex: "beefScore",
      width: 100,
      sorter: (a, b) => (a.beefScore || 0) - (b.beefScore || 0),
      render: (val: BeefNoodleComment["beefScore"]) => (
        <b className={styles.scoreTCell}>{val}</b>
      ),
    },
    {
      title: "牛肉描述",
      dataIndex: "beefDescription",
      width: 300,
    },
    {
      title: "湯頭分數",
      dataIndex: "soupScore",
      width: 100,
      sorter: (a, b) => (a.soupScore || 0) - (b.soupScore || 0),
      render: (val: BeefNoodleComment["soupScore"]) => (
        <b className={styles.scoreTCell}>{val}</b>
      ),
    },
    {
      title: "湯頭描述",
      dataIndex: "soupDescription",
      width: 300,
    },
    {
      title: "整體描述",
      dataIndex: "overallDescription",
      width: 300,
    },
    {
      title: "再次造訪",
      dataIndex: "wantToVisitAgain",
      width: 100,
      render: (val: BeefNoodleComment["wantToVisitAgain"]) => (
        <b className={styles.booleanTCell}>{val ? "是" : "否"}</b>
      ),
      sorter: (a, b) => (a.wantToVisitAgain ? 1 : -1),
    },
    {
      title: "牛筋分數",
      dataIndex: "tendonScore",
      width: 100,
      sorter: (a, b) => (a.tendonScore || 0) - (b.tendonScore || 0),
      render: (val: BeefNoodleComment["tendonScore"]) => (
        <b className={styles.scoreTCell}>{val}</b>
      ),
    },
    {
      title: "牛筋描述",
      dataIndex: "tendonDescription",
      width: 300,
    },
    {
      title: "牛肚分數",
      dataIndex: "tripeScore",
      width: 100,
      sorter: (a, b) => (a.tripeScore || 0) - (b.tripeScore || 0),
      render: (val: BeefNoodleComment["tripeScore"]) => (
        <b className={styles.scoreTCell}>{val}</b>
      ),
    },
    {
      title: "牛肚描述",
      dataIndex: "tripeDescription",
      width: 300,
    },
  ];
  /**
   * @todo 照片上傳還沒弄
   */
  async function insertOneComment() {
    const { getFieldValue } = beefCommentForm;
    const comment: BeefNoodleCommentFromFirestore = {
      score: parseInt(getFieldValue("score")),
      storeName: String(getFieldValue("storeName")),
      visitDate: Timestamp.fromDate(visitDate.toDate()),
      itemName: String(getFieldValue("itemName")),
      itemPrice: parseInt(getFieldValue("itemPrice")),
      images: [],
      wantToVisitAgain: Boolean(getFieldValue("wantToVisitAgain")),
      noodleScore: getFieldValue("noodleScore"),
      noodleDescription: getFieldValue("noodleDescription"),
      beefScore: getFieldValue("beefScore"),
      beefDescription: getFieldValue("beefDescription"),
      tendonScore: getFieldValue("tendonScore"),
      tendonDescription: getFieldValue("tendonDescription"),
      tripeScore: getFieldValue("tripeScore"),
      tripeDescription: getFieldValue("tripeDescription"),
      soupScore: getFieldValue("soupScore"),
      soupDescription: getFieldValue("soupDescription"),
      overallDescription: getFieldValue("overallDescription"),
    };
    if (!comment.noodleScore) delete comment.noodleScore;
    if (!comment.noodleDescription) delete comment.noodleDescription;
    if (!comment.beefScore) delete comment.beefScore;
    if (!comment.beefDescription) delete comment.beefDescription;
    if (!comment.tendonScore) delete comment.tendonScore;
    if (!comment.tendonDescription) delete comment.tendonDescription;
    if (!comment.tripeScore) delete comment.tripeScore;
    if (!comment.tripeDescription) delete comment.tripeDescription;
    if (!comment.soupScore) delete comment.soupScore;
    if (!comment.soupDescription) delete comment.soupDescription;
    if (!comment.overallDescription) delete comment.overallDescription;
    toggleAddCommentLoading(true);
    const addDocResult = await addDoc(collectionRef, comment)
      .then((res) => res)
      .catch((err) => {
        if (err?.code === "permission-denied")
          notificationIns.error({ message: "很抱歉，您無權限新增評論" });
        else notification.error({ message: "新增評論失敗" });
        return ADD_DOC_FAILED;
      });
    toggleAddCommentLoading(false);
    toggleCommentModalOpen(false);
    if (addDocResult === ADD_DOC_FAILED) return;
    setDataSource((prev) => [
      ...prev,
      {
        ...comment,
        key: prev.length,
        visitDate: new Date(comment.visitDate.seconds * 1000),
      },
    ]);
    beefCommentForm.resetFields();
  }
  useEffect(() => {
    // signOut(auth).then(none => console.log('sign out'));
    // if (sessionStorage.getItem('accessToken')) return;
    // getRedirectResult(auth)
    //   .then(async (userCredential) => {
    //     if (!userCredential) return;
    //     console.log(userCredential);
    //     const idToken = await userCredential.user.getIdToken();
    //     const idTokenResult = await userCredential.user.getIdTokenResult();
    //     console.log(idToken, idTokenResult);
    //   })
    //   .catch(err => console.log(err));
    // signInWithRedirect(auth, googleAuthProvider)
    //   .then(async (never) => {
    //     const userCredential = await getRedirectResult(auth);
    //     if (!userCredential) return;
    //     const oAuthCredential = GoogleAuthProvider.credentialFromResult(userCredential);
    //     if (!oAuthCredential) return;
    //     if (!oAuthCredential.accessToken) return;
    //     console.log(oAuthCredential);
    //     sessionStorage.setItem('accessToken', oAuthCredential.accessToken);
    //   })
    //   .catch(err => console.log(err));
    // getRedirectResult
    // signInWithPopup(auth, googleAuthProvider)
    //   .then((userCredential) => {
    //     const oAuthCredential =
    //       GoogleAuthProvider.credentialFromResult(userCredential);
    //     if (!oAuthCredential) return;
    //     const additionalUserInfo = getAdditionalUserInfo(userCredential);
    //     console.log({ oAuthCredential, additionalUserInfo });
    //   })
    //   .catch((error) => {
    //     const oAuthCredential = GoogleAuthProvider.credentialFromError(error);
    //     console.log({ error, oAuthCredential });
    //   });
  }, []);
  useEffect(function getAllComments() {
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const beefNoodleComments: BeefNoodleComment[] = querySnapshot.docs.map(
          (snapshot, idx) => {
            const document = snapshot.data();
            return {
              ...document,
              key: idx,
              visitDate: new Date(document.visitDate.seconds * 1000),
            };
          }
        );
        setDataSource(beefNoodleComments);
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    setVh();
    addEventListener("resize", setVh);
    return () => removeEventListener("resize", setVh);
  }, []);
  return (
    <>
      <Head>
        <title>雙北牛肉麵評論</title>
        <meta name="description" content="喜歡吃牛肉麵嗎？那絕對不能錯過這個" />
        <meta name="title" content="雙北牛肉麵評論" />
        <meta property="og:title" content="雙北牛肉麵評論" />
        <meta
          property="og:url"
          content="https://nmdap.udn.com.tw/test/beef_noodle/"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/beef-noodle-fe137.appspot.com/o/20230625%2F20230625_124910.jpg?alt=media&token=392f3e72-26d7-4e96-9d42-022ee0c08249"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:description"
          content="喜歡吃牛肉麵嗎？那絕對不能錯過這個"
        />
        <meta property="og:site_name" content="雙北牛肉麵評論" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="雙北牛肉麵評論" />
        <meta
          name="twitter:description"
          content="喜歡吃牛肉麵嗎？那絕對不能錯過這個"
        />
      </Head>
      <Header>
        <Title
          level={1}
          style={{
            color: "white",
            margin: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          雙北牛肉麵評分
        </Title>
      </Header>
      <Content>
        <Table
          bordered
          className={styles.table}
          // header 64px + pagination 64px + thead 55px + 1px
          scroll={{ y: "calc(100 * var(--vh) - 64px - 64px - 55px - 1px)" }}
          dataSource={dataSource}
          columns={columns}
        ></Table>
        <Modal
          title="新增評論"
          open={commentModalOpen}
          footer={null}
          cancelButtonProps={{ disabled: addCommentLoading }}
          onCancel={() => toggleCommentModalOpen(false)}
        >
          <Form
            form={beefCommentForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            className={styles.beefCommentForm}
          >
            <Form.Item required label="店名：" name="storeName">
              <Input required></Input>
            </Form.Item>
            <Form.Item required label="分數：" name="score">
              <InputNumber
                required
                controls={false}
                min={0}
                max={100}
              ></InputNumber>
            </Form.Item>
            <Form.Item required label="造訪日期：">
              <DatePicker
                aria-required
                allowClear={false}
                value={visitDate}
                onChange={(day) => day && setVisitDate(day)}
              ></DatePicker>
            </Form.Item>
            <Form.Item required label="品項：" name="itemName">
              <Input required></Input>
            </Form.Item>
            <Form.Item required label="價格：" name="itemPrice">
              <InputNumber required controls={false}></InputNumber>
            </Form.Item>
            <Form.Item required label="再度造訪：" name="wantToVisitAgain">
              <Radio.Group>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="麵條分數：" name="noodleScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="麵條評論：" name="noodleDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="湯頭分數：" name="soupScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="湯頭評論：" name="soupDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肉分數：" name="beefScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肉評論：" name="beefDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛筋分數：" name="tendonScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛筋評論：" name="tendonDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肚分數：" name="tripeScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肚評論：" name="tripeDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="圖片：">
              <Upload onChange={(info) => console.log(info)}>
                <Button icon={<UploadOutlined />}>上傳圖片</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="整體評論：" name="overallDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
              <Button
                htmlType="button"
                onClick={() => toggleCommentModalOpen(false)}
                style={{ marginRight: "8px" }}
                disabled={addCommentLoading}
              >
                取消
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                onClick={insertOneComment}
                loading={addCommentLoading}
              >
                送出
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <FloatButton
          icon={<PlusOutlined />}
          tooltip="新增評論"
          type="primary"
          style={{ left: "24px", bottom: "16px" }}
          onClick={() => toggleCommentModalOpen(true)}
        ></FloatButton>
      </Content>
      {Notification}
    </>
  );
}
