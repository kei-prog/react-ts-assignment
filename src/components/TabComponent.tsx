import { useState, MouseEvent } from "react";

type Props = {
  handleClick: (tab: Tab) => void;
};

export type Tab = "all" | "student" | "mentor";

export const TabComponent = ({ handleClick }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const isTab = (value: string | null): value is Tab => {
    return value === "all" || value === "student" || value === "mentor";
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const tab = e.currentTarget.getAttribute("data-tab");
    if (isTab(tab)) {
      setActiveTab(tab);
      handleClick(tab);
    }
  };

  return (
    <div>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            data-tab="all"
            className={`nav-link ${activeTab === "all" ? "active" : ""}`}
            aria-current={activeTab === "all" ? "page" : undefined}
            href="#"
            onClick={onClick}
          >
            全員
          </a>
        </li>
        <li className="nav-item">
          <a
            data-tab="student"
            className={`nav-link ${activeTab === "student" ? "active" : ""}`}
            aria-current={activeTab === "student" ? "page" : undefined}
            href="#"
            onClick={onClick}
          >
            生徒
          </a>
        </li>
        <li className="nav-item">
          <a
            data-tab="mentor"
            className={`nav-link ${activeTab === "mentor" ? "active" : ""}`}
            aria-current={activeTab === "mentor" ? "page" : undefined}
            href="#"
            onClick={onClick}
          >
            メンター
          </a>
        </li>
      </ul>
    </div>
  );
};
