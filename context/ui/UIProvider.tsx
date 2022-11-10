import { useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

interface Props {
    children: React.ReactNode
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

export const UIProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' })
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' })
    }

    const changeIsAddingState = (payload: boolean) => dispatch({ type: 'UI - Is adding', payload })
    const changeIsDraggingState = (payload: boolean) => dispatch({ type: 'UI - Is dragging', payload })

    return (
        <UIContext.Provider value={{
            ...state,
            // Methods
            openSideMenu,
            closeSideMenu,
            changeIsAddingState,
            changeIsDraggingState
        }}>
            {children}
        </UIContext.Provider>
    )
}