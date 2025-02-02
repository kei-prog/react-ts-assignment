import { useState, useEffect } from "react";
import { TabComponent, Tab } from "./components/TabComponent";
import { UserList } from "./components/UserList";
import { Form } from "./components/Form";
import { User, USER_LIST } from "./data/users";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const generateUserList = (userList: User[]) => {
    return userList.map((user) => {
      if (user.role === "student" && user.taskCode != null) {
        const mentorNames = userList
          .filter(
            (u) =>
              u.role === "mentor" &&
              u.availableStartCode != null &&
              u.availableEndCode != null &&
              user.taskCode! > u.availableStartCode! &&
              user.taskCode! < u.availableEndCode!,
          )
          .map((mentor) => mentor.name);
        return { ...user, availableMentors: mentorNames.join(",") };
      } else if (
        user.role === "mentor" &&
        user.availableStartCode != null &&
        user.availableEndCode != null
      ) {
        const studentNames = userList
          .filter(
            (u) =>
              u.role === "student" &&
              u.taskCode != null &&
              u.taskCode! > user.availableStartCode! &&
              u.taskCode! < user.availableEndCode!,
          )
          .map((student) => student.name);
        return { ...user, availableStudents: studentNames.join(",") };
      }
      return user;
    });
  };

  const [userList, setUserList] = useState<User[]>(() =>
    generateUserList(USER_LIST),
  );
  const [displayUserList, setDisplayUserList] = useState<User[]>([]);

  useEffect(() => {
    if (activeTab === "all") {
      setDisplayUserList(userList);
    } else if (activeTab === "students") {
      setDisplayUserList(userList.filter((user) => user.role === "student"));
    } else if (activeTab === "mentors") {
      setDisplayUserList(userList.filter((user) => user.role === "mentor"));
    }
  }, [activeTab, userList]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (formData: User) => {
    const newId = Math.max(...userList.map((user) => user.id)) + 1;
    const updatedUserList = [...userList, { ...formData, id: newId }];
    setUserList(generateUserList(updatedUserList));
  };
  const sortKeys: (keyof User)[] = ["studyMinutes", "score", "experienceDays"];

  const handleSortByKey = (key: keyof User, isAscending: boolean) => {
    if (!sortKeys.includes(key)) return;

    setUserList(
      [...userList].sort((a, b) => {
        const aValue = (a[key] as number) ?? 0;
        const bValue = (b[key] as number) ?? 0;
        return isAscending ? aValue - bValue : bValue - aValue;
      }),
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <TabComponent handleClick={handleTabClick} />
        <UserList
          activeTab={activeTab}
          handleSortByKey={handleSortByKey}
          filteredUserList={displayUserList}
        />
        <Form onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default App;
