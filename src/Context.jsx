import { createContext, useState } from "react";

const Context = createContext(null);

function Provider({ children }) {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [session, setSession] = useState(null);


    const state = {
        users,
        setUsers,
        admins,
        setAdmins,
        session,
        setSession,
    };
    return <Context.Provider value={state}>{children}</Context.Provider>;
}

export default { Provider, Context };