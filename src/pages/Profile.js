import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [skills, setSkills] = useState([]);

  // Load data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(storedSkills);
  }, []);

  // Add skill
  function addSkill() {
    if (!skill) return;

    const newSkill = {
      name: skill,
      level,
      verified: false,
      verificationType: null, // project | qa
    };

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));

    setSkill("");
    setLevel("Intermediate");
  }

  // Verify skill
  function verifySkill(index, type) {
    const updatedSkills = [...skills];
    updatedSkills[index].verified = true;
    updatedSkills[index].verificationType = type;

    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));
  }

  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Please login first</h2>;
  }

  const levels = [
    "Expert / Experienced",
    "Intermediate",
    "Basic",
    "Want to Learn",
  ];

  return (
    <div className="profile-page">
      {/* PROFILE HEADER */}
      <div className="card profile-header">
        <h2>{user.name}</h2>
        <p>{user.branch} • {user.college}</p>
      </div>

      {/* ADD SKILL */}
      <div className="card">
        <h3>Add Skill</h3>
        <div className="add-skill-row">
          <input
            type="text"
            placeholder="Skill name"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            {levels.map((lvl) => (
              <option key={lvl}>{lvl}</option>
            ))}
          </select>

          <button onClick={addSkill}>Add</button>
        </div>
      </div>

      {/* SKILLS */}
      <div className="card">
        <h3>Skills</h3>

        {levels.map((lvl) => (
          <div key={lvl} className="skill-group">
            <h4>{lvl}</h4>

            {skills.filter((s) => s.level === lvl).length === 0 && (
              <p className="empty-text">No skills added</p>
            )}

            {skills
              .filter((s) => s.level === lvl)
              .map((s, index) => (
                <div key={index} className="skill-item">
                  <span>{s.name}</span>

                  {s.verified ? (
                    <span className="badge badge-verified">
                      Verified ({s.verificationType === "project" ? "Project" : "Q&A"})
                    </span>
                  ) : (
                    <div className="verify-actions">
                      <button onClick={() => verifySkill(index, "project")}>
                        Verify via Project
                      </button>
                      <button onClick={() => verifySkill(index, "qa")}>
                        Verify via Q&A
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
