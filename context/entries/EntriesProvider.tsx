import { useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];

}

interface Props {
    children: React.ReactNode
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addEntry = (description: string) => {
        const payload: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending'
        }

        dispatch({ type: 'Entries - Add entry', payload })
    }

    const updateEntry = (payload: Entry) => dispatch({ type: 'Entries - Update Entry', payload })


    return (
        <EntriesContext.Provider value={{
            ...state,
            addEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}