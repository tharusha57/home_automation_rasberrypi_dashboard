import { useContext } from "react";
import { RenderContext } from "../context/renderContext";

export const useRenderContext = () => {
    const context = useContext(RenderContext)

    if(!context){
        throw Error('Error in context')
    }

    return context
}