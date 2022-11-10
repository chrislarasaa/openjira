import { Entry } from '../../interfaces';
import { EntriesState } from './';


type EntriesActionType =
    | { type: 'Entries - Add entry', payload: Entry }
    | { type: 'Entries - Update Entry', payload: Entry }
    | { type: 'Entries - Get Entries', payload: Entry[]}


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case 'Entries - Add entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case 'Entries - Update Entry':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id == action.payload._id) entry.status = action.payload.status
                    return entry
                })
            }
        case 'Entries - Get Entries':
            return {
                ...state,
                entries: action.payload
            }
        default:
            return state
    }

}