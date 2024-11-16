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
import { getStorage, list, ref, uploadBytes } from "firebase/storage";
import { addDoc, Timestamp } from "firebase/firestore/lite";
import { signInWithPopup } from "firebase/auth";
import dayjs from "dayjs";

// Local application/library specific imports.
import setVh from "../../utils/setVh";
import styles from "./index.module.css";
import type {
  BeefNoodleComment,
  BeefNoodleCommentFirestore,
  BeefNoodleCommentForm,
  BeefNoodleCommentLocalStorage,
} from "../../types";
import ImageDialogCarousel from "../../components/ImageDialogCarousel";
import {
  auth,
  googleAuthProvider,
  beefNoodleCommentsCollectionRef,
} from "../../utils/firebase";
import { useAllBeefNoodleComments } from "../../hooks/useBeefNoodleComments";

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
const fallbackData: BeefNoodleComment[] = [];
function getYYYYMMDD(inputDate: BeefNoodleCommentForm["visitDate"]) {
  const year = inputDate.year();
  const month = String(inputDate.month() + 1).padStart(2, "0");
  const date = String(inputDate.date()).padStart(2, "0");
  return `${year}${month}${date}`;
}
/**
 * storage folder name 命名規則:
 *
 * `YYYYMMDD`
 *
 * `YYYYMMDD_1`
 *
 * `YYYYMMDD_2`
 *
 * 依此類推
 */
async function getStorageFolderName(inputFolderName: string): Promise<string> {
  const folderRef = ref(firebaseStorage, inputFolderName);
  const listResult = await list(folderRef, { maxResults: 1 });
  const isEmptyFolder =
    listResult.prefixes.length === 0 && listResult.items.length === 0;
  if (isEmptyFolder) return inputFolderName;
  const [YYYYMMDD, strIndex] = inputFolderName.split("_");
  const index = parseInt(strIndex);
  if (!strIndex) return getStorageFolderName(`${YYYYMMDD}_1`);
  if (!Number.isInteger(index))
    throw new Error(
      `[function getStorageFolderName] invalid folder name ${inputFolderName}`
    );
  if (index >= 10)
    throw new Error(
      `[function getStorageFolderName] max recursion exceeded. ${inputFolderName}`
    );
  return getStorageFolderName(`${YYYYMMDD}_${index + 1}`);
}

export default function List() {
  const [isLogged, toggleIsLogged] = useState(false);
  const { data, mutate } = useAllBeefNoodleComments();
  const beefNoodleComments = data || fallbackData;
  const [commentModalOpen, toggleCommentModalOpen] = useState(false);
  const [beefNoodleCommentFormIns] = Form.useForm<BeefNoodleCommentForm>();
  const [addCommentLoading, toggleAddCommentLoading] = useState(false);
  const [notificationIns, Notification] = notification.useNotification();
  const [selectedRowId, setSelectedRowId] = useState("");
  function saveBeefNoodleCommentToLocalStorage() {
    const beefNoodleComment = beefNoodleCommentFormIns.getFieldsValue();
    const beefNoodleCommentStr = JSON.stringify(beefNoodleComment);
    const filteredBeefNoodleComment = JSON.parse(
      beefNoodleCommentStr
    ) as BeefNoodleCommentLocalStorage;

    if (Object.keys(filteredBeefNoodleComment).length < 3) return;
    if (
      Object.keys(filteredBeefNoodleComment).length === 3 &&
      filteredBeefNoodleComment.images.length === 0 &&
      typeof filteredBeefNoodleComment.visitDate === "string" &&
      typeof filteredBeefNoodleComment.wantToVisitAgain === "boolean"
    )
      return;
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
    const YYYYMMDD = getYYYYMMDD(visitDate);
    const shouldContinue = confirm(`請確認造訪日期為 ${YYYYMMDD}？`);
    if (!shouldContinue) return;
    const folderName = await getStorageFolderName(YYYYMMDD);
    const uploadImageRequests = images.map((imageFile) => {
      if (!imageFile.originFileObj) return false;
      const storageRef = ref(
        firebaseStorage,
        `${folderName}/${imageFile.name}`
      );
      return uploadBytes(storageRef, imageFile.originFileObj);
    });
    const uploadImageResponses = await Promise.allSettled(uploadImageRequests);
    const hasFailedResponse = uploadImageResponses.some(
      (u) =>
        u.status === "rejected" ||
        (u.status === "fulfilled" && u.value === false)
    );
    if (hasFailedResponse)
      return notificationIns.error({ message: "上傳圖片失敗" });
    comment.images = uploadImageResponses
      .map(
        (res, idx) =>
          res.status === "fulfilled" &&
          res.value &&
          `${folderName}/${images[idx].name}`
      )
      .filter((imagePath) => typeof imagePath === "string") as string[];
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
      .then(() => {
        notificationIns.success({ message: "新增評論成功" });
        mutate(beefNoodleComments, { revalidate: true });
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
          content="https://beef-noodle-brown.vercel.app/list"
        />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/beef-noodle-v2.appspot.com/o/20230625%2F20230625_124910.jpg?alt=media&token=a8a4ec9d-4516-4dd7-82a9-46205e2afb80"
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
                customRequest={(opt) => {
                  typeof opt.onSuccess === "function" &&
                    opt.onSuccess(opt.file);
                }}
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
