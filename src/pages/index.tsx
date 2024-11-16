import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CSSProperties, FC, useState } from "react";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import {
  Button,
  Skeleton,
  Tag,
  Typography,
  ConfigProvider,
  ThemeConfig,
  Spin,
} from "antd";
import {
  CommentOutlined,
  DollarOutlined,
  EnvironmentFilled,
  FilterOutlined,
  HeartFilled,
  StarFilled,
} from "@ant-design/icons";
import Share from "../components/Share";
import Head from "next/head";
import { useAllBeefNoodleComments } from "../hooks/useBeefNoodleComments";
import generateImageURL from "../utils/generateImageURL";

let isOuterSwiperSliding = false;
const { Title, Text } = Typography;
const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FF8C42",
    colorPrimaryBg: "#FFF0E6",
    colorPrimaryBgHover: "#FFE5D4",
    colorPrimaryBorder: "#FFB27B",
    colorPrimaryBorderHover: "#FF9758",
    colorPrimaryHover: "#FF9E5C",
    colorPrimaryActive: "#FF7F33",
    colorPrimaryTextHover: "#FF6A13",
    colorPrimaryText: "#FF8C42",
    colorPrimaryTextActive: "#FF6A13",
  },
};
const skeletonNodeCss: CSSProperties = { width: "100%", height: "100%" };
const outerModules: SwiperOptions["modules"] = [Navigation, HashNavigation];
const innerModules: SwiperOptions["modules"] = [Pagination];

const DraggableCarousel: FC = () => {
  const [outerSwiperOk, toggleOuterSwiperOk] = useState(false);
  const { data: beefNoodleComments } = useAllBeefNoodleComments();
  return (
    <ConfigProvider theme={theme}>
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
          content="https://beef-noodle-brown.vercel.app"
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
      <main className={styles.main}>
        <header></header>
        <div className={styles.carouselContainer}>
          {/* 不同間店的圖片swiper */}
          {beefNoodleComments && (
            <Swiper
              cssMode={false}
              hashNavigation
              modules={outerModules}
              className={styles.outerSwiper}
              onSlideChange={(swiper) => {
                isOuterSwiperSliding = true;
                document.title =
                  beefNoodleComments[swiper.activeIndex].storeName;
              }}
              onSlideChangeTransitionEnd={() => (isOuterSwiperSliding = false)}
              onSwiper={() => toggleOuterSwiperOk(true)}
            >
              {beefNoodleComments.map((beefNoodleComment) => (
                <SwiperSlide
                  data-hash={beefNoodleComment.id}
                  key={beefNoodleComment.id}
                  className={styles.swiperSlide}
                >
                  <div className={styles.topArea}>
                    <Title level={2} className={styles.storeName}>
                      {beefNoodleComment.storeName}
                    </Title>
                  </div>
                  {/* 同一間店的圖片swiper */}
                  <Swiper
                    pagination
                    speed={0}
                    modules={innerModules}
                    resistanceRatio={0}
                    className={styles.innerSwiper}
                    spaceBetween={16}
                    watchSlidesProgress
                    allowTouchMove={false}
                    lazyPreloaderClass={styles.swiperLazyPreloader}
                    onClick={(swiper, e) => {
                      if (isOuterSwiperSliding) return;
                      const clientX =
                        e instanceof TouchEvent
                          ? e.changedTouches.item(0)?.clientX ||
                            Number.MAX_SAFE_INTEGER
                          : e.clientX;
                      const isClickOnRightSide =
                        clientX / window.innerWidth > 0.5;
                      isClickOnRightSide
                        ? swiper.slideNext()
                        : swiper.slidePrev();
                    }}
                  >
                    {beefNoodleComment.images.map((imagePath) => (
                      <SwiperSlide
                        key={imagePath}
                        className={styles.swiperSlide}
                      >
                        <img
                          src={generateImageURL(imagePath)}
                          alt=""
                          loading="lazy"
                        />
                        <div className={styles.swiperLazyPreloader}>
                          <Skeleton.Node active style={skeletonNodeCss}>
                            <div></div>
                          </Skeleton.Node>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className={styles.bottomArea}>
                    <div className={styles.line1}>
                      <Title level={3} className={styles.itemName}>
                        {beefNoodleComment.itemName}
                      </Title>
                      <Text className={styles.visitDate}>
                        造訪日期:{" "}
                        {beefNoodleComment.visitDate
                          .toISOString()
                          .substring(0, 10)}
                      </Text>
                    </div>
                    <div className={styles.tags}>
                      <Tag className={styles.tag} icon={<DollarOutlined />}>
                        {beefNoodleComment.itemPrice}元
                      </Tag>
                      <Tag className={styles.tag} icon={<StarFilled />}>
                        {beefNoodleComment.score}分
                      </Tag>
                      {/* <Tag
                        className={styles.tag}
                        icon={<CalendarOutlined/>}
                      >
                        {beefNoodleComment.visitDate.toLocaleDateString()}
                      </Tag> */}
                      {/* <Tag
                        color={beefNoodleComment.wantToVisitAgain ? "green" : "red"}
                        className={styles.tag}
                        icon={beefNoodleComment.wantToVisitAgain
                          ? <CheckCircleOutlined />
                          : <CloseOutlined/>
                        }
                      >推薦</Tag> */}
                    </div>
                    <div className={styles.actions}>
                      {/* <Paragraph className={styles.overallDescription}>
                        {beefNoodleComment.overallDescription}
                      </Paragraph> */}
                      {/* todo 連結google地圖 */}
                      <Button
                        disabled
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<EnvironmentFilled />}
                        // onClick={() => open("https://maps.app.goo.gl/e7qDYXTSDbrTPrhx9")}
                      ></Button>
                      {/* todo 加到我的最愛 */}
                      <Button
                        disabled
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<HeartFilled />}
                      ></Button>
                      {/* todo 查看評論 */}
                      <Button
                        disabled
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<CommentOutlined />}
                      ></Button>
                      {/* todo 篩選地區,分數...功能 */}
                      <Button
                        disabled
                        shape="circle"
                        type="primary"
                        size="large"
                        icon={<FilterOutlined />}
                      ></Button>
                      <Share></Share>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {!outerSwiperOk && (
                <div className={styles.spinBackDrop}>
                  <Spin spinning={true} size="large"></Spin>
                </div>
              )}
            </Swiper>
          )}
        </div>
        <footer></footer>
      </main>
    </ConfigProvider>
  );
};

export default DraggableCarousel;
