import { createContext } from 'react'

interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    //Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    changeIsAddingState: (payload: boolean) => void;
    changeIsDraggingState: (patload: boolean) => void;
}

export const UIContext = createContext({} as ContextProps)