import React, {useState} from 'react'

const AppContext = React.createContext([{}, () => {
}]);

export const initialState = {
    user: null,
    token: null,
    toast: () => {
    }
};

export const AppContextProvider = (props) => {
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );
};

export const isAdmin = (context) => {
    return context.user && context.user.uloge.some(value => value === "ROLE_ADMIN");
}

export default AppContext;