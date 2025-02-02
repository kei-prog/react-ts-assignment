import { useEffect, useMemo, useState } from "react";
import { User } from "../data/users";
import { Tab } from "./TabComponent";

type Props = {
  activeTab: Tab;
  handleSortByKey: (key: keyof User, isAscending: boolean) => void;
  filteredUserList: User[];
};

export const UserList = ({
  activeTab,
  handleSortByKey,
  filteredUserList,
}: Props) => {
  const [isAscendingByStudyMinute, setIsAscendingByStudyMinute] =
    useState(false);
  const [isAscendingByScore, setIsAscendingByScore] = useState(false);
  const [isAscendingByExperienceDay, setIsAscendingByExperienceDay] =
    useState(false);
  const [displayColumns, setDisplayColumns] = useState<(keyof User)[]>([]);
  const commonColumns: (keyof User)[] = useMemo(
    () => [
      "name",
      "role",
      "email",
      "age",
      "postCode",
      "phone",
      "hobbies",
      "url",
    ],
    [],
  );

  const studentColumns: (keyof User)[] = useMemo(
    () => [
      "studyMinutes",
      "taskCode",
      "studyLangs",
      "score",
      "availableMentors",
    ],
    [],
  );

  const mentorColumns: (keyof User)[] = useMemo(
    () => [
      "experienceDays",
      "useLangs",
      "availableStartCode",
      "availableEndCode",
      "availableStudents",
    ],
    [],
  );

  useEffect(() => {
    if (activeTab === "all") {
      setDisplayColumns([
        ...commonColumns,
        ...studentColumns,
        ...mentorColumns,
      ]);
    } else if (activeTab === "students") {
      setDisplayColumns([...commonColumns, ...studentColumns]);
    } else if (activeTab === "mentors") {
      setDisplayColumns([...commonColumns, ...mentorColumns]);
    }
  }, [activeTab, commonColumns, studentColumns, mentorColumns]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {displayColumns.map((key, index) => (
              <th
                key={index}
                scope="col"
                onClick={() => {
                  if (key === "studyMinutes" && activeTab === "students") {
                    handleSortByKey(key, !isAscendingByStudyMinute);
                    setIsAscendingByStudyMinute(!isAscendingByStudyMinute);
                  } else if (key === "score" && activeTab === "students") {
                    handleSortByKey(key, !isAscendingByScore);
                    setIsAscendingByScore(!isAscendingByScore);
                  } else if (
                    key === "experienceDays" &&
                    activeTab === "mentors"
                  ) {
                    handleSortByKey(key, !isAscendingByExperienceDay);
                    setIsAscendingByExperienceDay(!isAscendingByExperienceDay);
                  }
                }}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredUserList.map((user, index) => (
            <tr key={index}>
              {displayColumns.map((column, index) => (
                <td key={index}>{user[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
