import { createContext, useEffect, useState } from "react";

const UsersContext = createContext();

const UsersProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState(false);
  const login = user => {
    setLoggedInUser(user);
  };

  const [users, setUsers] = useState([]);
  const addNewUser = newUser => {
    setUsers([...users, newUser]);
    login(newUser);
    fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
  };
  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        addNewUser,
        loggedInUser,
        setLoggedInUser
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;