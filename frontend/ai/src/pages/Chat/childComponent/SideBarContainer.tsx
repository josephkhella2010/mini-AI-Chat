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
    flex: 1,
    overflowY: "auto",
    padding: "30px",
  },
});

interface PropsType {
  userId: any;
  handleDelete: any;
}

export default function SideBarContainer({ userId, handleDelete }: PropsType) {
  const classes = cssStyle();
  const dispatch = useDispatch();

  const items = useSelector(
    (state: RootState) => state.mainUserInfoData.singleUser.user?.items || [],
  );

  console.log("items", items);

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_ALL_CHATS_USER", payload: { userId } });
    }
  }, [userId, dispatch]);

  const AllitemExceptLast = items.filter(
    (_item, ind) => ind < items.length - 1,
  );

  const chatItemsWithChatId = AllitemExceptLast.filter(
    (it) => it.chatItems && it.chatItems.length > 0,
  ).map((it) => ({
    chatId: it.chatId,
    ...it.chatItems[it.chatItems.length - 1],
  }));

  const sliceQuestionAndAnswer = (lastItems: ItemsChatType[]) => {
    const result = lastItems?.map((que) => ({
      chatId: que?.chatId,
      question: que?.question ? que.question.slice(0, 20) + " ..." : "",
      answer: que?.answer ? que.answer.slice(0, 40) + " ..." : "",
    }));

    return result;
  };

  const slicedArr = sliceQuestionAndAnswer(chatItemsWithChatId);

  return (
    <div className={classes.sideBarWapper}>
      <div className={classes.sideBarMainContainer}>
        <h2>SideBarContainer</h2>

        <div className={classes.historyContainer}>
          {slicedArr &&
            slicedArr.map((item, _ind: number) => {
              return (
                <div key={item.chatId}>
                  <h4>{item?.question}</h4>
                  <p>{item?.answer}</p>

                  <button onClick={() => handleDelete(item?.chatId)}>
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
