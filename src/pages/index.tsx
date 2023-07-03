// Related third party imports.
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
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { getDownloadURL, list, ref } from "firebase/storage";
import { getDocs, updateDoc, addDoc } from "firebase/firestore/lite";

// Local application/library specific imports.
import type {
  BeefNoodleComment,
  BeefNoodleCommentFromFirestore,
} from "../types";
import GlobalContext from "../contexts/GlobalContext";
import getCollection from "../utils/getCollection";
import ImageDialogCarousel from "../components/ImageDialogCarousel";
import Head from "next/head";

// Stateless vars declare.
const { Header, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export default Home;

function Home() {
  const [commentModalOpen, toggleCommentModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState<BeefNoodleComment[]>([]);
  const { firestore, firebaseStorage } = useContext(GlobalContext);
  const columns: ColumnsType<BeefNoodleComment> = [
    {
      title: "分數",
      dataIndex: "score",
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: "店名",
      dataIndex: "storeName",
    },
    {
      title: "造訪日期",
      dataIndex: "visitDate",
      render: (val: BeefNoodleComment["visitDate"]) => val.toLocaleDateString(),
    },
    {
      title: "品項",
      dataIndex: "itemName",
    },
    {
      title: "價格",
      dataIndex: "itemPrice",
      render: (val: BeefNoodleComment["itemPrice"]) => `$${val}`,
    },
    {
      title: "圖片",
      dataIndex: "images",
      render: (val: BeefNoodleComment["images"], record) => (
        <ImageDialogCarousel beefNoodleComment={record} />
      ),
    },
    {
      title: "麵條分數",
      dataIndex: "noodleScore",
      sorter: (a, b) => (a.noodleScore || 0) - (b.noodleScore || 0),
    },
    {
      title: "麵條描述",
      dataIndex: "noodleDescription",
    },
    {
      title: "牛肉分數",
      dataIndex: "beefScore",
      sorter: (a, b) => (a.beefScore || 0) - (b.beefScore || 0),
    },
    {
      title: "牛肉描述",
      dataIndex: "beefDescription",
    },
    {
      title: "牛筋分數",
      dataIndex: "tendonScore",
      sorter: (a, b) => (a.tendonScore || 0) - (b.tendonScore || 0),
    },
    {
      title: "牛筋描述",
      dataIndex: "tendonDescription",
    },
    {
      title: "牛肚分數",
      dataIndex: "tripeScore",
      sorter: (a, b) => (a.tripeScore || 0) - (b.tripeScore || 0),
    },
    {
      title: "牛肚描述",
      dataIndex: "tripeDescription",
    },
    {
      title: "湯頭分數",
      dataIndex: "soupScore",
      sorter: (a, b) => (a.soupScore || 0) - (b.soupScore || 0),
    },
    {
      title: "湯頭描述",
      dataIndex: "soupDescription",
    },
    {
      title: "整體描述",
      dataIndex: "overallDescription",
    },
    {
      title: "是否願意再次造訪",
      dataIndex: "wantToVisitAgain",
      render: (val: BeefNoodleComment["wantToVisitAgain"]) =>
        val ? "是" : "否",
      sorter: (a, b) => (a.wantToVisitAgain ? 1 : -1),
    },
  ];
  useEffect(function getAllComments() {
    const collectionRef = getCollection<BeefNoodleCommentFromFirestore>(
      firestore,
      "beefNoodleComments"
    );
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const beefNoodleComments: BeefNoodleComment[] = querySnapshot.docs.map(
          (snapshot, idx) => {
            const document = snapshot.data();
            return {
              ...document,
              key: idx,
              visitDate: new Date(document.visitDate.seconds),
            };
          }
        );
        setDataSource(beefNoodleComments);
      })
      .catch((e) => console.log(e));
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
          style={{ wordBreak: "keep-all" }}
          scroll={{ x: true }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        ></Table>
        <Modal
          title="新增評論"
          open={commentModalOpen}
          onOk={() => toggleCommentModalOpen(false)}
          onCancel={() => toggleCommentModalOpen(false)}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="店名：">
              <Input></Input>
            </Form.Item>
            <Form.Item label="分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="造訪日期：">
              <DatePicker></DatePicker>
            </Form.Item>
            <Form.Item label="品項：">
              <Input></Input>
            </Form.Item>
            <Form.Item label="價格：">
              <InputNumber controls={false}></InputNumber>
            </Form.Item>
            <Form.Item label="麵條分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label=" 麵條評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="湯頭分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="湯頭評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肉分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肉評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛筋分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛筋評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="牛肚分數：">
              <InputNumber controls={false} min={0} max={100}></InputNumber>
            </Form.Item>
            <Form.Item label="牛肚評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="圖片：">
              <Upload>
                <Button icon={<UploadOutlined />}>上傳圖片</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="整體評論：">
              <TextArea></TextArea>
            </Form.Item>
            <Form.Item label="再度造訪：">
              <Radio.Group>
                <Radio>是</Radio>
                <Radio>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
        <FloatButton
          icon={<PlusOutlined />}
          tooltip="新增評論"
          type="primary"
          onClick={() => toggleCommentModalOpen(true)}
        ></FloatButton>
      </Content>
    </>
  );
}
