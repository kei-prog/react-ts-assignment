import { useEffect, useMemo, useState } from "react";
import { User } from "../data/users";
import { Tab } from "./TabComponent";

type Props = {
  activeTab: Tab;
  handleSortByKey: (key: keyof User, isAscending: boolean) => void;
  filteredUserList: User[];
};

type SortState = Partial<Record<keyof User, boolean>>;

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

const SORTABLE_COLUMNS: Record<Tab, (keyof User)[]> = {
  student: ["studyMinutes", "score"],
  mentor: ["experienceDays"],
  all: [],
};

export const UserList = ({
  activeTab,
  handleSortByKey,
  filteredUserList,
}: Props) => {
  const [displayColumns, setDisplayColumns] = useState<(keyof User)[]>([]);

  const [sortState, setSortState] = useState<SortState>({});

  const columnsByTab: Record<Tab, (keyof User)[]> = useMemo(
    () => ({
      all: [...COMMON_COLUMNS, ...STUDENT_COLUMNS, ...MENTOR_COLUMNS],
      student: [...COMMON_COLUMNS, ...STUDENT_COLUMNS],
      mentor: [...COMMON_COLUMNS, ...MENTOR_COLUMNS],
    }),
    [],
  );

  const handleSort = (key: keyof User) => {
    if (SORTABLE_COLUMNS[activeTab].includes(key)) {
      const newIsAscending = !sortState[key];
      setSortState({ ...sortState, [key]: newIsAscending });
      handleSortByKey(key, newIsAscending);
    }
  };

  useEffect(() => {
    setDisplayColumns(columnsByTab[activeTab]);
  }, [activeTab, columnsByTab]);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {displayColumns.map((key, index) => (
              <th key={index} scope="col" onClick={() => handleSort(key)}>
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
