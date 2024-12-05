import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [page]);

  const filteredData = data.filter((character) =>
    character.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <h1>Rick and Morty Character Table</h1>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Table */}
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((character) => (
              <tr
                key={character.id}
                onClick={() => handleCharacterClick(character)}
              >
                <td>{character.name}</td>
                <td>{character.species}</td>
                <td>{character.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No characters found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} </span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* Character Detail */}
      {selectedCharacter && (
        <div>
          <h2>Details of {selectedCharacter.name}</h2>
          <p>Species: {selectedCharacter.species}</p>
          <p>Status: {selectedCharacter.status}</p>
          <p>Gender: {selectedCharacter.gender}</p>
        </div>
      )}
    </div>
  );
};

export default App;
