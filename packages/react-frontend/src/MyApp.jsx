// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";



function MyApp() {
  const [characters, setCharacters] = useState([]);

  // might have to remove use from "wrapper"
function updateList(person) { 
    postUser(person)
      .then((res) => res.json())
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => {
        console.log(error);
      })
}


function postUser(person) {
  console.log(JSON.stringify(person));
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
  
  return promise;
}


/*function postUser(person) {
  console.log(JSON.stringify(person));
  const promise = fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    else {
      throw new Error(`Failed to insert user. Status Code: ${response.status}`)
    }
  });
  return promise;
} */

  function removeOneCharacter(index) {
    /* const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated); */

    const userToDelete = characters[index]; 
    const promise = fetch("http://localhost:8000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userToDelete.id })
    })
      .then((response) => {
        if (response.status === 204){
          const updated = characters.filter((_, i) => i!= index);
          setCharacters(updated);
        } 
      })
      .catch((error) => console.log(error));
      return promise;
  }

function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );


  return (
    <div className="container">
      <Table 
      characterData={characters} 
      removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit = {updateList}/>
    </div>
  );
}
export default MyApp;
