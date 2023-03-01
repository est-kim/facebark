import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let internalToken = null;

export function getToken() {
    return internalToken;
}

export async function getTokenInternal() {
    const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/token`;
    try {
        const response = await fetch(url, {
        credentials: "include",
        });
        if (response.ok) {
        const data = await response.json();
        internalToken = data.access_token;
        return internalToken;
        }
    } catch (e) {}
    return false;
}

function handleErrorMessage(error) {
    if ("error" in error) {
        error = error.error;
        try {
            error = JSON.parse(error);
            if ("__all__" in error) {
                error = error.__all__;
            }
        } catch {}
    }
    if (Array.isArray(error)) {
        error = error.join("<br>");
    } else if (typeof error === "object") {
        error = Object.entries(error).reduce(
        (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
        ""
        );
    }
    return error;
}

export const AuthContext = createContext({
    token: null,
    setToken: () => null,
    user: null,
    setUser: () => null,
    isLoggedIn: null,
    setIsLoggedIn: () => null
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
    const { token, setToken, user, setUser, setIsLoggedIn } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchToken() {
            const token = await getTokenInternal();
            setToken(token);
        }
        if (!token) {
            fetchToken();
        }
    }, [setToken, token]);

    async function logout() {
        if (token) {
            const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/token`;
            await fetch(url, { method: "delete", credentials: "include" });
            localStorage.removeItem('token');
            internalToken = null;
            setToken(null);
            setIsLoggedIn(false);
            navigate("/");
        }
    }

    async function login(username, password) {
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/token`;
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        const response = await fetch(url, {
            method: "post",
            credentials: "include",
            body: form,
        });
        if (response.ok) {
            const token = await getTokenInternal();
            setToken(token);
            setIsLoggedIn(true);
            navigate("/home")
            return;
        } else {
            let error = await response.json();
            setIsLoggedIn(false);
            return handleErrorMessage(error);
        }
    }

    async function signup(
        username,
        password,
        email,
        phoneNumber,
        dogName,
        imageUrl,
        breed,
        sex,
        dob,
        ownerName,
        description,
        city,
        state
        ) {
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                username,
                password,
                email,
                phone_number: phoneNumber,
                name: dogName,
                image_url: imageUrl,
                breed,
                sex,
                dob,
                owner_name: ownerName,
                description,
                city_id: city,
                state_id: state
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
        await login(username, password);
        }
        return false;
    }

    async function update(username, password, email) { /// fix here
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/accounts`;
        const response = await fetch(url, {
            method: "patch", //fix here
            body: JSON.stringify({
                username,
                password,
                email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
        await login(username, password);
        }
        return false;
    }
    return [ token, login, logout, signup, update ];
}

/// what is this for and how do we use this?! is it the account by id?
export const useUser = (token) => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (!token) {
        return;
    }

    async function getUser() {
        const url = `${process.env.REACT_APP_FACEBARK_API_HOST}/current_user`;
        const response = await fetch(url, {
            credentials: "include",
        });
        if (response.ok) {
            const newUser = await response.json();
            setUser(newUser);
        }
    }

    getUser();
  }, [token]);
  console.log("THIS IS THE USERRRR", user)
  return user;
};
