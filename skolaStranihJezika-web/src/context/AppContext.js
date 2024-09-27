import React, {useState} from 'react'

const AppContext = React.createContext([{}, () => {
}]);

export const initialState = {};

export const AppContextProvider = (props) => {
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContext;