import { createContext, useReducer } from "react";

export const RenderContext = createContext()

export const renderReducer = (state, action) => {
    switch (action.type) {
        case 'RENDER_ON':
            return true
        case 'RENDER_OFF':
            return false
        default:
            return state
    }
}

const initial_state = { render : false }

export const RenderContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(renderReducer, initial_state)
    return <RenderContext.Provider value={{ ...state, dispatch }}>
        {children}
    </RenderContext.Provider>
}