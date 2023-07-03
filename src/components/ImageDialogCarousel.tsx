// Related third party imports.
import { useState } from "react";
import { Button, Carousel, Modal } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

// Local application/library specific imports.
import type { BeefNoodleComment } from "../types";

// Stateless vars declare.

export default ImageDialogCarousel;

function ImageDialogCarousel(props: { beefNoodleComment: BeefNoodleComment }) {
  const { beefNoodleComment } = props;
  const [imgModalOpen, toggleImgModalOpen] = useState(false);
  return (
    <>
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
          {beefNoodleComment.images.map((imageURL) => (
            <div key={imageURL}>
              <img width="100%" src={imageURL} />
            </div>
          ))}
        </Carousel>
      </Modal>
    </>
  );
}
