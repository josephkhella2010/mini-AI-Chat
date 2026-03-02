import { createUseStyles } from "react-jss";
import ChatFirstContainer from "./childComponent/ChatFirstContainer";
import SideBarContainer from "./childComponent/SideBarContainer";

export const cssStyle = createUseStyles({
  chatPageMainContainer: {
    width: "100%",
    height: "calc(100dvh - 50px)",
    backgroundColor: "aquamarine",
    "@media (max-width: 650px)": {},
  },
  chatPageContainer: {
    display: "flex",
    gap: "20px",
  },
});
export default function ChatPage() {
  const classes = cssStyle();
  return (
    <div className={classes.chatPageMainContainer}>
      <div className={classes.chatPageContainer}>
        <SideBarContainer />
        <ChatFirstContainer />
      </div>
    </div>
  );
}
