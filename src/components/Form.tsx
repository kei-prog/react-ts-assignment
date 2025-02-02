import { ChangeEvent, useState, MouseEvent } from "react";
import { User } from "../data/users";

type Role = "student" | "mentor";
type FormProps = { onSubmit: (formData: User) => void };

export const Form = ({ onSubmit }: FormProps) => {
  const [role, setRole] = useState<Role>("student");
  const initialFormData = {
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
    <K extends keyof User>(key: K, converter?: (value: string) => User[K]) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = converter ? converter(e.target.value) : e.target.value;
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
        <div className="mb-3">
          <label htmlFor="nameForm" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameForm"
            value={formData.name}
            onChange={handleChange("name")}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="emailForm" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailForm"
            value={formData.email}
            onChange={handleChange("email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageForm" className="form-label">
            age
          </label>
          <input
            type="number"
            className="form-control"
            id="ageForm"
            value={formData.age}
            onChange={handleChange("age", Number)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postCodeForm" className="form-label">
            postCode
          </label>
          <input
            type="text"
            className="form-control"
            id="postCodeForm"
            value={formData.postCode}
            onChange={handleChange("postCode")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneForm" className="form-label">
            phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneForm"
            value={formData.phone}
            onChange={handleChange("phone")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hobbiesForm" className="form-label">
            hobbies
          </label>
          <input
            type="text"
            className="form-control"
            id="hobbiesForm"
            value={formData.hobbies}
            onChange={handleChange("hobbies")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="urlForm" className="form-label">
            url
          </label>
          <input
            type="url"
            className="form-control"
            id="urlForm"
            value={formData.url}
            onChange={handleChange("url")}
          />
        </div>
        {role === "student" && (
          <>
            <div className="mb-3">
              <label htmlFor="studyMinutesForm" className="form-label">
                studyMinutes
              </label>
              <input
                type="number"
                className="form-control"
                id="studyMinutesForm"
                value={formData.studyMinutes}
                onChange={handleChange("studyMinutes", Number)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="taskCodeForm" className="form-label">
                taskCode
              </label>
              <input
                type="text"
                className="form-control"
                id="taskCodeForm"
                value={formData.taskCode}
                onChange={handleChange("taskCode")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studylangsForm" className="form-label">
                studylangs
              </label>
              <input
                type="string"
                className="form-control"
                id="studylangsForm"
                value={formData.studyLangs}
                onChange={handleChange("studyLangs")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="scoreForm" className="form-label">
                score
              </label>
              <input
                type="number"
                className="form-control"
                id="scoreForm"
                value={formData.score}
                onChange={handleChange("score", Number)}
              />
            </div>
          </>
        )}
        {role === "mentor" && (
          <>
            <div className="mb-3">
              <label htmlFor="experienceDaysForm" className="form-label">
                experienceDays
              </label>
              <input
                type="number"
                className="form-control"
                id="experienceDaysForm"
                value={formData.experienceDays}
                onChange={handleChange("experienceDays", Number)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="useLangsForm" className="form-label">
                useLangs
              </label>
              <input
                type="text"
                className="form-control"
                id="useLangsForm"
                value={formData.useLangs}
                onChange={handleChange("useLangs")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="availableStartCodeForm" className="form-label">
                availableStartCode
              </label>
              <input
                type="text"
                className="form-control"
                id="availableStartCodeForm"
                value={formData.availableStartCode}
                onChange={handleChange("availableStartCode")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="availableEndCodeForm" className="form-label">
                availableEndCode
              </label>
              <input
                type="text"
                className="form-control"
                id="availableEndCodeForm"
                value={formData.availableEndCode}
                onChange={handleChange("availableEndCode")}
              />
            </div>
          </>
        )}
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        送信
      </button>
    </form>
  );
};
