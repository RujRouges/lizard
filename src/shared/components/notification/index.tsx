import { toast } from "react-hot-toast";

import { styled } from "../../style/stitches.config";

type NotificationType = "success" | "warning";

export const notify = (type: NotificationType, message: string) => {
  return toast.custom(Notification(message, type), {
    duration: 5000,
    position: "top-right",
  });
};

const Notification = (message: string, type: NotificationType) => {
  return (
    <NotificationContainer type={type}>
      <Row>
        <Message>{message}</Message>
      </Row>
    </NotificationContainer>
  );
};

// styles

const NotificationContainer = styled("div", {
  borderRadius: 4,
  minWidth: 200,
  padding: 48,
  backgroundColor: "$white",
  variants: {
    type: {
      success: {
        boxShadow: "-12px 12px $greenLight",
      },
      warning: {
        boxShadow: "-12px 12px $red",
      },
    },
  },
});

const Row = styled("div", {
  display: "flex",
  flexDirection: "row",
});

const Message = styled("div", {
  fontSize: 16,
});
