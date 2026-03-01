import { useDispatch, useSelector } from "react-redux";
import SettingPageFirstContainer from "./childComponent/SettingPageFirstContainer";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SaveUpdateSection from "./childComponent/SaveUpdateSection";
import type { SaveInputValType } from "../../utilities/interfaces";

export default function SettingUserPage() {
  const dispatch = useDispatch();

  const { users, singleUser } = useSelector(
    (state: RootState) => state.mainUserInfoData,
  );
  const { userId } = useParams();
  const [_, setEditId] = useState<number | null>(null);
  const [showSaveContainer, setShowSaveContainer] = useState<boolean>(false);
  const [saveInputVal, setSaveInputVal] = useState<SaveInputValType>({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
  });

  /* function */
  const filteredUser = users.find((user) => user.id === Number(userId));
  console.log("filteredUser", filteredUser);
  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
  }, [dispatch]);

  const handleEdit = (userId: number) => {
    const userToEdit = users.find((user) => Number(user.id) === Number(userId));

    if (!userToEdit) {
      console.log("User not found!");
      return;
    }
    setEditId(userId);
    setShowSaveContainer(true);
    setSaveInputVal({
      username: userToEdit.username ?? "",
      email: userToEdit.email ?? "",
      password: userToEdit.password.slice(0, 4) ?? "",
      firstname: userToEdit.firstname ?? "",
      lastname: userToEdit.lastname ?? "",
      dateOfBirth: userToEdit.dateOfBirth ?? "",
    });
  };
  const handleOnChangeSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSaveInputVal((prev) => ({
      ...prev,
      [name as keyof SaveInputValType]: value,
    }));
  };
  const handleSave = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditId(null);
    setShowSaveContainer(false);
    const normalizedData = {
      ...saveInputVal,
      username: saveInputVal.username.toLowerCase(),
      email: saveInputVal.email.toLowerCase(),
      firstname: saveInputVal.firstname.toLowerCase(),
      lastname: saveInputVal.lastname.toLowerCase(),
    };

    dispatch({
      type: "FETCH_UPDATE_USER",
      payload: {
        userId: Number(userId),
        data: normalizedData,
      },
    });
    /* 
    setSaveInputVal({
      username: saveInputVal.username,
      email: saveInputVal.email,
      password: saveInputVal.password,
      firstname: saveInputVal.firstname,
      lastname: saveInputVal.lastname,
      dateOfBirth: saveInputVal.dateOfBirth,
    });
    const findUserIndex = users.findIndex(
      (u) => Number(u.id) === Number(userId),
    );
    if (findUserIndex === -1) {
      console.log("cannot find userIndex");
      return;
    }
    console.log("findUserIndex", users[findUserIndex]);
    const updatedUsers = [...users];

    updatedUsers[findUserIndex] = {
      ...updatedUsers[findUserIndex], // spread existing user
      username: saveInputVal.username,
      email: saveInputVal.email,
      password: saveInputVal.password,
      firstname: saveInputVal.firstname,
      lastname: saveInputVal.lastname,
      dateOfBirth: saveInputVal.dateOfBirth,
    };

    dispatch(setUsers(updatedUsers)); // 🔥 important */
  };

  console.log("saveInputVal", saveInputVal);
  /*  */
  return (
    <div>
      <SettingPageFirstContainer
        singleUser={singleUser}
        handleEdit={handleEdit}
      />
      {showSaveContainer && (
        <SaveUpdateSection
          singleUser={singleUser}
          saveInputVal={saveInputVal}
          handleOnChangeSave={handleOnChangeSave}
          handleSave={handleSave}
        />
      )}
      {users &&
        users.map((u) => {
          return (
            <div
              style={{
                border: "2px solid black",
                marginBottom: "10px",
                padding: "10px",
              }}
            >
              <h4>name:{u.firstname + " " + u.lastname} </h4>
              <h4>Email:{u.email} </h4>
              <h4>Username:{u.username} </h4>
              <h4>Password:{u.password} </h4>
              <h4>dateOfBirth:{u.dateOfBirth} </h4>
            </div>
          );
        })}
    </div>
  );
}
