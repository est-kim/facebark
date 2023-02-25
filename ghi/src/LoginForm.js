import React, { useState } from "react";
import { useAuthContext, useToken } from "./Authentication";


function LoginForm() {
    const { token, login } = useToken();
    // const { token } = useAuthContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
    }

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await login(username, password);
      } catch (error) {
        console.log(error.response)
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    );

}

export default LoginForm
