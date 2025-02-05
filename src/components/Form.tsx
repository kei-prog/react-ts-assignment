import { ChangeEvent, useState, MouseEvent } from "react";
import { User } from "../data/users";
import { FormField as ForField } from "./FormField";

type Role = "student" | "mentor";
type FormProps = { onSubmit: (formData: User) => void };

const initialFormData: User = {
  id: 0,
  name: "",
  role: "student",
  email: "",
  age: 0,
  postCode: "",
  phone: "",
  hobbies: [],
  url: "",
  studyMinutes: 0,
  taskCode: 0,
  studyLangs: [],
  score: 0,
  experienceDays: 0,
  useLangs: [],
  availableStartCode: 0,
  availableEndCode: 0,
};

export const Form = ({ onSubmit }: FormProps) => {
  const [role, setRole] = useState<Role>("student");
  const [formData, setFormData] = useState<User>(initialFormData);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const requiredFields: (keyof User)[] = [
      "name",
      "role",
      "email",
      "age",
      "postCode",
      "phone",
      "url",
    ];

    if (role === "student") {
      requiredFields.push("studyMinutes", "taskCode", "studyLangs", "score");
    } else if (role === "mentor") {
      requiredFields.push(
        "experienceDays",
        "useLangs",
        "availableStartCode",
        "availableEndCode",
      );
    }

    const emptyFields = requiredFields.filter((key) => {
      const value = formData[key];
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (emptyFields.length > 0) {
      alert(`入力必須です: ${emptyFields.join(", ")}`);
      return;
    }

    onSubmit(formData);
  };

  const handleChange =
    <K extends keyof User>(key: K, converter?: (value: User[K]) => User[K]) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = converter
        ? converter(e.target.value as User[K])
        : (e.target.value as User[K]);
      setFormData({ ...formData, [key]: value });
    };

  const handleRolechange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    setRole(newRole);
    setFormData({ ...initialFormData, role: newRole });
  };

  return (
    <form>
      <div className="d-flex">
        <ForField
          label="name"
          id="nameForm"
          type="text"
          value={formData.name}
          onChange={handleChange("name")}
        />
        <div className="mb-3">
          <label htmlFor="roleForm" className="form-label">
            role
          </label>
          <select
            className="form-control"
            id="roleForm"
            value={formData.role}
            onChange={handleRolechange}
          >
            <option value="student">student</option>
            <option value="mentor">mentor</option>
          </select>
        </div>
        <ForField
          label="email"
          id="emailForm"
          type="email"
          value={formData.email}
          onChange={handleChange("email")}
        />
        <ForField
          label="age"
          id="ageForm"
          type="number"
          value={formData.age}
          onChange={handleChange("age", Number)}
        />
        <ForField
          label="postCode"
          id="postCodeForm"
          type="text"
          value={formData.postCode}
          onChange={handleChange("postCode")}
        />
        <ForField
          label="phone"
          id="phoneForm"
          type="tel"
          value={formData.phone}
          onChange={handleChange("phone")}
        />
        <ForField
          label="hobbies"
          id="hobbiesForm"
          type="text"
          value={formData.hobbies}
          onChange={handleChange("hobbies")}
        />
        <ForField
          label="url"
          id="urlForm"
          type="url"
          value={formData.url}
          onChange={handleChange("url")}
        />
        {role === "student" && (
          <>
            <ForField
              label="studyMinutes"
              id="studyMinutesForm"
              type="number"
              value={formData.studyMinutes}
              onChange={handleChange("studyMinutes", Number)}
            />
            <ForField
              label="taskCode"
              id="taskCodeForm"
              type="text"
              value={formData.taskCode}
              onChange={handleChange("taskCode")}
            />
            <ForField
              label="studylangs"
              id="studylangsForm"
              type="text"
              value={formData.studyLangs}
              onChange={handleChange("studyLangs")}
            />
            <ForField
              label="score"
              id="scoreForm"
              type="number"
              value={formData.score}
              onChange={handleChange("score", Number)}
            />
          </>
        )}
        {role === "mentor" && (
          <>
            <ForField
              label="experienceDays"
              id="experienceDaysForm"
              type="number"
              value={formData.experienceDays}
              onChange={handleChange("experienceDays", Number)}
            />
            <ForField
              label="useLangs"
              id="useLangsForm"
              type="text"
              value={formData.useLangs}
              onChange={handleChange("useLangs")}
            />
            <ForField
              label="availableStartCode"
              id="availableStartCodeForm"
              type="text"
              value={formData.availableStartCode}
              onChange={handleChange("availableStartCode")}
            />
            <ForField
              label="availableEndCode"
              id="availableEndCodeForm"
              type="text"
              value={formData.availableEndCode}
              onChange={handleChange("availableEndCode")}
            />
          </>
        )}
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        送信
      </button>
    </form>
  );
};
