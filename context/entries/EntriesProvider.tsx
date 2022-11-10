import { useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

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

    const addEntry = async (description: string) => {

        const { data: payload } = await entriesApi.post<Entry>('/entries', { description })

        dispatch({ type: 'Entries - Add entry', payload })
    }

    const updateEntry = async (entry: Entry) => {
        try {
            const { data: payload } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
                description: entry.description,
                status: entry.status
            })

            dispatch({ type: 'Entries - Update Entry', payload })
        } catch (error) {
            console.log({error})
        }

    }

    const refreshEntries = async () => {
        const { data: payload } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: 'Entries - Get Entries', payload })
    }

    useEffect(() => {
        refreshEntries()
    }, [])


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