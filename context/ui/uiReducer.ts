import {UIState } from './';


type UIActionType = 
    | {type: 'UI - Open Sidebar'}
    | {type: 'UI - Close Sidebar'}
    | {type: 'UI - Is adding', payload: boolean}
    | {type: 'UI - Is dragging', payload: boolean}


export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false
            }
        case 'UI - Is adding':
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case 'UI - Is dragging':
            return {
                ...state,
                isDragging: action.payload
            }
        default:
            return state
        }

}