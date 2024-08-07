// Related third party imports.
import Head from "next/head";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import {
  Upload,
  Form,
  Radio,
  InputNumber,
  Layout,
  Table,
  Button,
  Modal,
  Input,
  DatePicker,
  notification,
  Dropdown,
  type UploadProps,
  type DropDownProps,
  type FormRule,
  type FormProps,
  type MenuProps,
  type TableProps,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  MenuOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getDocs, addDoc, Timestamp } from "firebase/firestore/lite";
import { signInWithPopup } from "firebase/auth";
import dayjs from "dayjs";

// Local application/library specific imports.
import setVh from "../../utils/setVh";
import styles from "./index.module.css";
import type {
  BeefNoodleComment,
  BeefNoodleCommentFirestore,
  BeefNoodleCommentForm,
  BeefNoodleCommentJSON,
} from "../../types";
import ImageDialogCarousel from "../../components/ImageDialogCarousel";
import {
  auth,
  googleAuthProvider,
  allBeefNoodleCommentsQuery,
  beefNoodleCommentsCollectionRef,
} from "../../utils/firebase";
import { GetServerSideProps } from "next";

// Stateless vars declare.
const beefNoodleCommentKey = "beefNoodleComment";
let isCommentModalOpened = false;
const checkCircleStyle: CSSProperties = {
  color: "#52c41a",
};
const closeCircleStyle: CSSProperties = {
  color: "#ff4d4f",
};
const headerStyle: CSSProperties = {
  position: "relative",
  paddingInline: "16px",
};
const menuButtonStyle: CSSProperties = {
  position: "absolute",
  right: "16px",
  top: "50%",
  transform: "translateY(-50%)",
};
const scoreTCellStyle: CSSProperties = { color: "red" };
const firebaseStorage = getStorage();
const today = dayjs();
const { Header, Content } = Layout;
const { TextArea } = Input;
const showUploadList: UploadProps["showUploadList"] = {
  showPreviewIcon: false,
};
const initialFileList: UploadProps["fileList"] = [];
const labelCol: FormProps["labelCol"] = { span: 4 };
const wrapperCol: FormProps["wrapperCol"] = { span: 20 };
const formButtonGroupWrapperCol: FormProps["wrapperCol"] = { span: 24 };
const trigger: DropDownProps["trigger"] = ["click"];
const storeNameRules: FormRule[] = [{ required: true, message: "請輸入店名" }];
const scoreRules: FormRule[] = [{ required: true, message: "請輸入分數" }];
const visitDateRules: FormRule[] = [{ required: true, message: "請選擇日期" }];
const itemNameRules: FormRule[] = [
  { required: true, message: "請輸入商品名稱" },
];
const itemPriceRules: FormRule[] = [
  { required: true, message: "請輸入商品價格" },
];
const wantToVisitAgainRules: FormRule[] = [
  { required: true, message: "請選擇是否再度造訪" },
];
const columns: ColumnsType<BeefNoodleComment> = [
  {
    title: "店名",
    dataIndex: "storeName",
    width: 150,
    fixed: "left",
  },
  {
    title: "分數",
    dataIndex: "score",
    width: 100,
    showSorterTooltip: false,
    sorter: (a, b) => a.score - b.score,
    render: (val: BeefNoodleComment["score"]) => (
      <b className={styles.scoreTCell} style={scoreTCellStyle}>
        {val}
      </b>
    ),
  },
  {
    title: "造訪日期",
    dataIndex: "visitDate",
    width: 120,
    defaultSortOrder: "ascend",
    showSorterTooltip: false,
    sorter: (a, b) =>
      Date.parse(a.visitDate.toISOString()) -
      Date.parse(b.visitDate.toISOString()),
    render: (val: BeefNoodleComment["visitDate"]) =>
      val.toISOString().substring(0, 10),
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
    width: 120,
    render: (val: BeefNoodleComment["images"], record) => (
      <ImageDialogCarousel beefNoodleComment={record} />
    ),
  },
  {
    title: "麵條分數",
    dataIndex: "noodleScore",
    width: 100,
    showSorterTooltip: false,
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
    showSorterTooltip: false,
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
    showSorterTooltip: false,
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
    showSorterTooltip: false,
    className: styles.wantToVisitAgainCell,
    sorter: (comment) => (comment.wantToVisitAgain ? 1 : -1),
    render: (val: BeefNoodleComment["wantToVisitAgain"]) =>
      val ? (
        <CheckCircleFilled style={checkCircleStyle} />
      ) : (
        <CloseCircleFilled style={closeCircleStyle} />
      ),
  },
  {
    title: "牛筋分數",
    dataIndex: "tendonScore",
    width: 100,
    showSorterTooltip: false,
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
    showSorterTooltip: false,
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
const tableScroll: TableProps<BeefNoodleComment>["scroll"] = {
  x: columns.map<number>((c) => c.width as number).reduce((a, b) => a + b, 0),
  y: "calc(100 * var(--vh) - 64px - 56px)",
};
async function getAllBeefNoodleCommentDocumentSnapShots() {
  const querySnapshot = await getDocs(allBeefNoodleCommentsQuery);
  return querySnapshot.docs;
}

type IProps = {
  beefNoodleCommentsJSON: BeefNoodleCommentJSON[];
};
export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const documentSnapshots = await getAllBeefNoodleCommentDocumentSnapShots();
  const beefNoodleCommentsJSON = documentSnapshots.map((documentSnapshot) => {
    const beefNoodleCommentFireStore = documentSnapshot.data();
    const id = documentSnapshot.id;
    return Object.assign(beefNoodleCommentFireStore, {
      id,
      visitDate: beefNoodleCommentFireStore.visitDate.toMillis(),
    });
  });
  return { props: { beefNoodleCommentsJSON } };
};

export default function List({ beefNoodleCommentsJSON }: IProps) {
  const beefNoodleComments: BeefNoodleComment[] = useMemo(
    () =>
      beefNoodleCommentsJSON.map((beefNoodleCommentJSON) =>
        Object.assign(beefNoodleCommentJSON, {
          visitDate: new Date(beefNoodleCommentJSON.visitDate),
        })
      ),
    []
  );
  const [commentModalOpen, toggleCommentModalOpen] = useState(false);
  const [beefNoodleCommentFormIns] = Form.useForm<BeefNoodleCommentForm>();
  const [isLogged, toggleIsLogged] = useState(false);
  const [addCommentLoading, toggleAddCommentLoading] = useState(false);
  const [notificationIns, Notification] = notification.useNotification();
  const [selectedRowId, setSelectedRowId] = useState("");
  function saveBeefNoodleCommentToLocalStorage() {
    const beefNoodleComment = beefNoodleCommentFormIns.getFieldsValue();
    const beefNoodleCommentStr = JSON.stringify(beefNoodleComment);
    localStorage.setItem(beefNoodleCommentKey, beefNoodleCommentStr);
  }
  function handleCommentModalClose() {
    toggleCommentModalOpen(false);
    saveBeefNoodleCommentToLocalStorage();
  }
  async function uploadImagesAndInsertComment(values: BeefNoodleCommentForm) {
    const { visitDate, images } = values;
    const comment: BeefNoodleCommentFirestore = {
      ...values,
      visitDate: Timestamp.fromMillis(visitDate.valueOf()),
      images: [],
    };
    const year = visitDate.year();
    const month = String(visitDate.month() + 1).padStart(2, "0");
    const date = String(visitDate.date()).padStart(2, "0");
    const folderName = `${year}${month}${date}`;
    const uploadImageRequests = images.map((imageFile) => {
      if (!imageFile.originFileObj) return false;
      const storageRef = ref(
        firebaseStorage,
        `${folderName}/${imageFile.name}`
      );
      return uploadBytes(storageRef, imageFile.originFileObj);
    });
    /**
     * @todo what if some promises reject?
     */
    const uploadImageResponses = await Promise.allSettled(uploadImageRequests);
    const getImageURLRequests = uploadImageResponses.map(
      (res) =>
        res.status === "fulfilled" && res.value && getDownloadURL(res.value.ref)
    );
    const getImageURLResponses = await Promise.allSettled(getImageURLRequests);
    comment.images = getImageURLResponses
      .map((res) => res.status === "fulfilled" && res.value)
      .filter((res) => typeof res === "string") as string[];
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
    await addDoc(beefNoodleCommentsCollectionRef, comment)
      .then((documentReference) => {
        notificationIns.success({ message: "新增評論成功，請重整頁面" });
        beefNoodleCommentFormIns.resetFields();
        localStorage.removeItem(beefNoodleCommentKey);
      })
      .catch((err) =>
        notificationIns.error({
          message:
            err.code === "permission-denied"
              ? "很抱歉，您無權限新增評論"
              : "新增評論失敗",
        })
      );
  }
  const headerMenuProps: MenuProps = useMemo(
    () => ({
      items: isLogged
        ? [
            {
              label: "新增評論",
              onClick: () => toggleCommentModalOpen(true),
              key: "1",
            },
          ]
        : [
            {
              label: "登入",
              onClick: () => signInWithPopup(auth, googleAuthProvider),
              key: "1",
            },
          ],
    }),
    [isLogged]
  );
  useEffect(
    function getBeefNoodleCommentFromLocalStorageWhenModalFirstOpen() {
      if (!commentModalOpen) return;
      if (isCommentModalOpened) return;
      isCommentModalOpened = true;
      const beefNoodleCommentStr = localStorage.getItem(beefNoodleCommentKey);
      if (!beefNoodleCommentStr) return;
      const beefNoodleComment = JSON.parse(
        beefNoodleCommentStr
      ) as BeefNoodleCommentForm;
      beefNoodleComment.visitDate = dayjs(beefNoodleComment.visitDate);
      beefNoodleCommentFormIns.setFieldsValue(beefNoodleComment);
    },
    [commentModalOpen]
  );
  useEffect(function addAuthStateObserver() {
    const unsubscribe = auth.onAuthStateChanged((user) =>
      toggleIsLogged(Boolean(user))
    );
    return () => unsubscribe();
  }, []);
  useEffect(function addEventHandlers() {
    setVh();
    addEventListener("resize", setVh);
    addEventListener("beforeunload", saveBeefNoodleCommentToLocalStorage);
    addEventListener("blur", saveBeefNoodleCommentToLocalStorage);
    return () => {
      removeEventListener("resize", setVh);
      removeEventListener("beforeunload", saveBeefNoodleCommentToLocalStorage);
      removeEventListener("blur", saveBeefNoodleCommentToLocalStorage);
    };
  }, []);
  useEffect(() => {
    const rowKey = location.hash.split("#")[1] || "";
    if (beefNoodleComments.length === 0) return;
    if (!rowKey) return;
    // change location hash instantly to trigger page scroll.
    location.hash = "";
    location.hash = rowKey;
    setSelectedRowId(rowKey);
  }, [beefNoodleComments]);
  return (
    <>
      <Head>
        <title>雙北牛肉麵評論</title>
        <meta
          name="description"
          content="喜歡吃牛肉麵嗎？那絕對不能錯過這個網站"
        />
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
      <Header style={headerStyle}>
        <h1 className={styles.title}>雙北牛肉麵評分</h1>
        <Dropdown trigger={trigger} menu={headerMenuProps}>
          <Button shape="circle" style={menuButtonStyle}>
            <MenuOutlined />
          </Button>
        </Dropdown>
      </Header>
      <Content>
        <Table
          bordered
          tableLayout="fixed"
          className={styles.table}
          dataSource={beefNoodleComments}
          columns={columns}
          pagination={false}
          scroll={tableScroll}
          rowKey="id"
          onRow={(beefNoodleComment) => ({
            id: beefNoodleComment.id,
            className:
              selectedRowId === beefNoodleComment.id
                ? "ant-table-row-selected"
                : "",
            onClick: (e) => {
              location.hash = beefNoodleComment.id;
              history.pushState(
                "",
                "",
                `?storeName=${beefNoodleComment.storeName}#${beefNoodleComment.id}`
              );
              setSelectedRowId(beefNoodleComment.id);
            },
          })}
        ></Table>

        <Modal
          title="新增評論"
          footer={null}
          open={commentModalOpen}
          cancelButtonProps={{ disabled: addCommentLoading }}
          onCancel={handleCommentModalClose}
        >
          <Form
            form={beefNoodleCommentFormIns}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            className={styles.beefNoodleCommentFormIns}
            onFinish={(values) => {
              toggleAddCommentLoading(true);
              uploadImagesAndInsertComment(values).finally(() => {
                toggleAddCommentLoading(false);
                toggleCommentModalOpen(false);
              });
            }}
          >
            <Form.Item label="店名" name="storeName" rules={storeNameRules}>
              <Input></Input>
            </Form.Item>
            <Form.Item label="分數" name="score" rules={scoreRules}>
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item
              label="造訪日期"
              name="visitDate"
              initialValue={today}
              rules={visitDateRules}
            >
              <DatePicker allowClear={false}></DatePicker>
            </Form.Item>
            <Form.Item label="品項" name="itemName" rules={itemNameRules}>
              <Input></Input>
            </Form.Item>
            <Form.Item label="價格" name="itemPrice" rules={itemPriceRules}>
              <InputNumber controls={false}></InputNumber>
            </Form.Item>
            <Form.Item
              label="再度造訪"
              name="wantToVisitAgain"
              initialValue={true}
              rules={wantToVisitAgainRules}
            >
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="麵條分數" name="noodleScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="麵條評論" name="noodleDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="湯頭分數" name="soupScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="湯頭評論" name="soupDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肉分數" name="beefScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肉評論" name="beefDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛筋分數" name="tendonScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛筋評論" name="tendonDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肚分數" name="tripeScore">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肚評論" name="tripeDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item
              label="圖片"
              name="images"
              valuePropName="fileList"
              initialValue={initialFileList}
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                multiple
                listType="picture-card"
                showUploadList={showUploadList}
              >
                上傳圖片
              </Upload>
            </Form.Item>
            <Form.Item label="整體評論" name="overallDescription">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item
              wrapperCol={formButtonGroupWrapperCol}
              className={styles.formButtonGroup}
            >
              <Button
                htmlType="button"
                onClick={handleCommentModalClose}
                disabled={addCommentLoading}
              >
                關閉
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={addCommentLoading}
              >
                送出
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      {Notification}
    </>
  );
}
