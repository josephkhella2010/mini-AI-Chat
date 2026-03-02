import { createUseStyles } from "react-jss";

export const cssStyle = createUseStyles({
  sideBarWapper: {
    position: "relative",
    width: "30%",
    background: "red",
    height: "calc(100dvh - 50px)",
  },
  sideBarMainContainer: {
    backgroundColor: "green",
    height: "calc(100dvh - 50px)",

    position: "sticky",
    top: 0,
    display: "flex",
    flexDirection: "column",
  },
  historyContainer: {
    flex: 1, // take remaining height
    overflowY: "auto", // vertical scroll only
    padding: "30px",
  },
});
export default function SideBarContainer() {
  const classes = cssStyle();

  return (
    <div className={classes.sideBarWapper}>
      <div className={classes.sideBarMainContainer}>
        <h2>SideBarContainer</h2>
        <div className={classes.historyContainer}>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5> <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5> <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
          <h5>Items</h5>
        </div>
      </div>
    </div>
  );
}
