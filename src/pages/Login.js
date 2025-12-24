import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    collegeId: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.college ||
      !formData.branch ||
      !formData.collegeId
    ) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/profile");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Link&Loop</h2>
        <p className="login-subtitle">Enter your details to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={formData.college}
            onChange={handleChange}
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
          />

          <input
            type="text"
            name="collegeId"
            placeholder="College ID"
            value={formData.collegeId}
            onChange={handleChange}
          />

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
