import { FC, useState } from "react";
import { ShareAltOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
// import { BeefNoodleComment } from "../types";
type IShareProps = {
  // beefNoodleComment: BeefNoodleComment;
};

/**
 * @todo line fb twitter share icons
 */
const Share: FC<IShareProps> = () => {
  const [tooltipProps, setTooltipProps] = useState({ open: false, title: "" });
  return (
    <Tooltip
      arrow
      trigger="click"
      title={tooltipProps.title}
      open={tooltipProps.open}
    >
      <Button
        shape="circle"
        type="primary"
        size="large"
        icon={<ShareAltOutlined />}
        onClick={() =>
          navigator.clipboard
            .writeText(location.href)
            .then(() => setTooltipProps({ open: true, title: "已複製連結" }))
            .catch(() => setTooltipProps({ open: true, title: "複製連結失敗" }))
            .finally(() =>
              setTimeout(
                () => setTooltipProps((prev) => ({ ...prev, open: false })),
                2000
              )
            )
        }
      ></Button>
    </Tooltip>
  );
};

export default Share;
