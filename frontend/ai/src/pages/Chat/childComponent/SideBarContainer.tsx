import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect } from "react";
import type { ItemsChatType } from "../../../utilities/interfaces";

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

interface PropsType {
  userId: any;
}
export default function SideBarContainer({ userId }: PropsType) {
  const classes = cssStyle();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.mainUserInfoData);
  console.log("items", items);
  const lastItems = items
    .map((item) => {
      return item.chatItems[item.chatItems.length - 1];
    })
    .filter(Boolean);

  const sliceQuestionAndAnswer = (lastItems: ItemsChatType[]) => {
    const result = lastItems?.map((que) => ({
      question: que?.question.slice(0, 20) + " ...",
      answer: que?.answer.slice(0, 40) + " ...",
    }));

    return result;
  };

  const slicedArr = sliceQuestionAndAnswer(lastItems);

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_ALL_CHATS_USER", payload: { userId: userId } });
    }
  }, [userId]);

  return (
    <div className={classes.sideBarWapper}>
      <div className={classes.sideBarMainContainer}>
        <h2>SideBarContainer</h2>
        <div className={classes.historyContainer}>
          {slicedArr &&
            slicedArr.map((item, ind: number) => {
              return (
                <div key={ind}>
                  <h4>{item?.question}</h4>
                  <p>{item?.answer}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
