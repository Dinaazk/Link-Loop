import { useEffect, useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];

    if (storedUser) {
      setUsers([storedUser]); // prototype: single user
      setSkills(storedSkills);
    }
  }, []);

  function handleSearch() {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const matchedSkills = skills.filter((s) =>
      s.name.toLowerCase().includes(lowerQuery)
    );

    const matchedUser =
      users[0] &&
      users[0].name.toLowerCase().includes(lowerQuery)
        ? users[0]
        : null;

    let searchResults = [];

    if (matchedUser) {
      searchResults.push({
        type: "user",
        data: matchedUser,
      });
    }

    matchedSkills.forEach((skill) => {
      searchResults.push({
        type: "skill",
        data: skill,
      });
    });

    setResults(searchResults);
  }

  return (
    <div className="search-page">
      <div className="card">
        <h3>Search</h3>

        <input
          type="text"
          placeholder="Search by name or skill..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="card">
        <h3>Results</h3>

        {results.length === 0 && (
          <p className="empty-text">No results found</p>
        )}

        {results.map((r, index) =>
          r.type === "user" ? (
            <div key={index} className="result-item">
              <strong>User:</strong> {r.data.name}
              <p>{r.data.branch} • {r.data.college}</p>
            </div>
          ) : (
            <div key={index} className="result-item">
              <strong>Skill:</strong> {r.data.name}
              <p>
                Level: {r.data.level} |{" "}
                {r.data.verified ? "Verified" : "Unverified"}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Search;
