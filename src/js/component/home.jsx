
import React, { useEffect, useState } from "react";

const Home = () => {
  const [username, setUsername] = useState("");
  const [list, setList] = useState([]);
  //   const [input, setInput] = useState("");

  const createUsername = async () => {
    try {
      let response = await fetch(
        `https://playground.4geeks.com/todo/users/${username}`,
        {
          method: "POST",
          body: JSON.stringify([]),
          headers: { "Content-Type": "application/json" }
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setUsername(username);
    } catch (error) {
      console.error(error.message);
    }
  };

  const valueUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  useEffect(() => {
    const showList = async () => {
      try {
        let response = await fetch(
          `https://playground.4geeks.com/todo/users/${username}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        let listTodos = await response.json();
        console.log(listTodos);
        setList(listTodos);
      } catch (e) {
        console.error("Error: ", e);
      }
    };
    showList();
  }, [username])


  const valueShowlist = (e) => {
    setList(e.target.value);
  };
  //   const valueInput = (e) => {
  //     setInput(e.target.value);
  //   };

  useEffect(() => {
    const handlerList = async () => {
      let newItem = {
        label: username,
        done: false
      };

      try {
        let response = await fetch(
          `https://playground.4geeks.com/todo/users/${username}`,
          {
            method: "PUT",
            body: JSON.stringify(newItem),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error("Network error");
        }

        let data = await response.json();
        console.log(data);
        setList([...list, newItem]);
        setList("");
      } catch (e) {
        console.error("Error: ", e);
      }

    };
    handlerList();
  }, [])



  const handleClick = async () => {
    await handlerList();
    await showList();
    await createUsername();
  };
  return (
    <div>
      <input type="text" value={username} onChange={valueUsername} />
      <button onClick={createUsername}>Crear usuario</button>{/* funciona, postea el usuario */}
      {/* <input type="text" value={input} onChange={valueInput} /> */}
      <button onClick={handleClick}>Agregar a la lista y mostrar</button>
      <ul>
        {
          list.map((element, index) => {
            (<li key={index}>
              <p>{element.label}</p>
            </li>)
          })
        }


      </ul>
    </div>
  );
};

export default Home;