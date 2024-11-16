// Related third party imports.
import { useState } from "react";
import { Button, Carousel, Modal } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

// Local application/library specific imports.
import styles from "./ImageDialogCarousel.module.css";
import type { BeefNoodleComment } from "../types";
import generateImageURL from "../utils/generateImageURL";

// Stateless vars declare.

export default ImageDialogCarousel;

function ImageDialogCarousel(props: { beefNoodleComment: BeefNoodleComment }) {
  const { beefNoodleComment } = props;
  const [imgModalOpen, toggleImgModalOpen] = useState(false);
  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <Button onClick={() => toggleImgModalOpen(true)}>看圖片</Button>
      <Modal
        title={beefNoodleComment.storeName}
        open={imgModalOpen}
        onOk={() => toggleImgModalOpen(false)}
        onCancel={() => toggleImgModalOpen(false)}
      >
        <Carousel
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {beefNoodleComment.images.map((imagePath) => (
            <div key={imagePath} className={styles.imageContainer}>
              <img src={generateImageURL(imagePath)} alt="" />
            </div>
          ))}
        </Carousel>
      </Modal>
    </div>
  );
}
