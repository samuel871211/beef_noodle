import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/controller";
// import 'swiper/css/effect-cards';
// import 'swiper/css/effect-cube';
import { CSSProperties, FC, useMemo } from "react";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  HashNavigation,
  // Controller,
  // EffectCards,
  // EffectCoverflow,
  // EffectCube
} from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { getDocs } from "firebase/firestore/lite";
import { allBeefNoodleCommentsQuery } from "../utils/firebase";
import { BeefNoodleComment } from "../types";
import useSWR from "swr";
import {
  Button,
  Skeleton,
  Tag,
  Typography,
  ConfigProvider,
  ThemeConfig,
} from "antd";
import {
  // CalendarOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  CommentOutlined,
  DollarOutlined,
  EnvironmentFilled,
  FilterOutlined,
  HeartFilled,
  // MoreOutlined,
  // ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import Share from "../components/Share";
// import { PictureFilled } from "@ant-design/icons";

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
const hashNavigation: SwiperOptions["hashNavigation"] = { watchState: true };
async function getAllBeefNoodleComments() {
  const querySnapshot = await getDocs(allBeefNoodleCommentsQuery);
  return querySnapshot.docs;
}

const DraggableCarousel: FC = () => {
  const { data, isLoading } = useSWR("key", getAllBeefNoodleComments, {
    revalidateOnFocus: false,
  });
  const beefNoodleComments: BeefNoodleComment[] = useMemo(
    () =>
      (data || []).map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          key: doc.id,
          visitDate: docData.visitDate.toDate(),
        };
      }),
    [data]
  );
  const initialSlide = useMemo(
    () => (data || []).findIndex((doc) => location.hash.includes(doc.id)),
    [data]
  );
  return (
    <ConfigProvider theme={theme}>
      <main className={styles.main}>
        <header></header>
        <div className={styles.carouselContainer}>
          {/* 不同間店的圖片swiper */}
          {!isLoading && (
            <Swiper
              hashNavigation={hashNavigation}
              modules={outerModules}
              className={styles.outerSwiper}
              onSlideChange={() => (isOuterSwiperSliding = true)}
              onSlideChangeTransitionEnd={() => (isOuterSwiperSliding = false)}
              initialSlide={initialSlide}
            >
              {beefNoodleComments.map((beefNoodleComment) => (
                <SwiperSlide
                  data-hash={beefNoodleComment.key}
                  key={beefNoodleComment.key}
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
                    {beefNoodleComment.images.map((imageURL) => (
                      <SwiperSlide
                        key={imageURL}
                        className={styles.swiperSlide}
                      >
                        <img src={imageURL} alt="" loading="lazy" />
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
                        {beefNoodleComment.visitDate.toLocaleDateString()}
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
            </Swiper>
          )}
        </div>
        <footer></footer>
      </main>
    </ConfigProvider>
  );
};

export default DraggableCarousel;
