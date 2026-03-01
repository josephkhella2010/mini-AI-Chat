import { createUseStyles } from "react-jss";
import { saveForm } from "../../../utilities/Arrays";
import type {
  SaveInputValType,
  singleUserType,
} from "../../../utilities/interfaces";
interface PropsType {
  singleUser: singleUserType;
  saveInputVal: SaveInputValType;
  handleOnChangeSave: any;
  handleSave: any;
}
export const cssStyle = createUseStyles({
  saveMainContainer: {
    backgroundColor: "#0000009c",
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100dvh",
    "@media (max-width: 650px)": {
      backgroundColor: "#0000009c",
    },
  },
});

export default function SaveUpdateSection({
  singleUser,
  saveInputVal,
  handleOnChangeSave,
  handleSave,
}: PropsType) {
  const classes = cssStyle();
  console.log("singleUser in save container", singleUser);
  return (
    <div className={classes.saveMainContainer}>
      <form onSubmit={handleSave}>
        {saveForm.map((item, index) => {
          return (
            <label htmlFor={item.name} key={index}>
              <p>{item.label}</p>
              <input
                type={item.type}
                name={item.name}
                id={item.name}
                value={saveInputVal[item.name as keyof SaveInputValType]}
                onChange={(e) => handleOnChangeSave(e)}
              />
            </label>
          );
        })}
        <button type="submit"> save</button>
      </form>
    </div>
  );
}
