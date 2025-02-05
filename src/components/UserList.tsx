import { useEffect, useMemo, useState } from "react";
import { User } from "../data/users";
import { Tab } from "./TabComponent";

type Props = {
  activeTab: Tab;
  handleSortByKey: (key: keyof User, isAscending: boolean) => void;
  filteredUserList: User[];
};

const COMMON_COLUMNS: (keyof User)[] = [
  "name",
  "role",
  "email",
  "age",
  "postCode",
  "phone",
  "hobbies",
  "url",
];

const STUDENT_COLUMNS: (keyof User)[] = [
  "studyMinutes",
  "taskCode",
  "studyLangs",
  "score",
  "availableMentors",
];

const MENTOR_COLUMNS: (keyof User)[] = [
  "experienceDays",
  "useLangs",
  "availableStartCode",
  "availableEndCode",
  "availableStudents",
];

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

  const columnsByTab: Record<Tab, (keyof User)[]> = useMemo(
    () => ({
      all: [...COMMON_COLUMNS, ...STUDENT_COLUMNS, ...MENTOR_COLUMNS],
      students: [...COMMON_COLUMNS, ...STUDENT_COLUMNS],
      mentors: [...COMMON_COLUMNS, ...MENTOR_COLUMNS],
    }),
    [],
  );

  useEffect(() => {
    setDisplayColumns(columnsByTab[activeTab]);
  }, [activeTab, columnsByTab]);

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
