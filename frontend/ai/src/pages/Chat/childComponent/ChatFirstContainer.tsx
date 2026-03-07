import { createUseStyles } from "react-jss";
import type { ItemsChatType } from "../../../utilities/interfaces";

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
    top: "95%",
    overflowY: "auto",
    "& textarea": {
      width: "80%",
      minHeight: "50px",
    },
  },
});
interface PropsType {
  handleAddItemChat: () => void;
  handleAddChat: () => void;
  chatItems: ItemsChatType[];
  chatInput: string;
  setChatInput: (chatInput: string) => void;
}
export default function ChatFirstContainer({
  handleAddItemChat,
  handleAddChat,
  chatItems,
  chatInput,
  setChatInput,
}: PropsType) {
  const classes = cssStyle();

  /*  */
  return (
    <div className={classes.chatFirstMainContainer}>
      <div className={classes.chatFirstContent}>
        <button onClick={() => handleAddChat()}>New Chat</button>
        {chatItems &&
          chatItems.map((item, ind) => {
            return (
              <div
                key={ind}
                style={{
                  border: "2px solid black",
                  padding: "4px",
                  marginBottom: "10px",
                }}
              >
                <h2> question:{item.question}</h2>
                <p>answer: {item.answer}</p>
              </div>
            );
          })}
      </div>
      <div className={classes.chatInputSection}>
        <div>
          <textarea
            placeholder="Hello and Welcom"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItemChat()}
          />
          <button onClick={handleAddItemChat}> send</button>
        </div>
      </div>
    </div>
  );
}
