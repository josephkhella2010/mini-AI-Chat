import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  chatFirstMainContainer: {
    width: "70%",
    backgroundColor: "yellow",
    height: "calc(100dvh - 100px)",
    display: "flex",
    gap: "40px",
    flexDirection: "column",
    position: "relative",

    "@media (max-width: 650px)": {},
  },
  chatFirstContent: {
    backgroundColor: "blue",
    paddingBottom: "200px",
    overflowY: "auto",
  },
  chatInputSection: {
    backgroundColor: "orangered",
    width: "100%",
    height: "50px",
    position: "absolute",
    top: "100%",
  },
});

export default function ChatFirstContainer() {
  const classes = cssStyle();
  return (
    <div className={classes.chatFirstMainContainer}>
      <div className={classes.chatFirstContent}>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
        <h1>ChatFirstContainer</h1>
      </div>
      <div className={classes.chatInputSection}>
        <div>input</div>
      </div>
    </div>
  );
}
