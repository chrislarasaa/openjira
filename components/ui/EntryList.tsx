import { List, Paper } from "@mui/material"
import { useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import style from './EntryList.module.css'

interface Props {
    status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, changeIsDraggingState } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(e => e._id === id)!
        entry.status = status
        updateEntry(entry)
        changeIsDraggingState(false)
    }

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? style.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 250px)',
                    overflow: 'scroll',
                    backgroundColor: 'transparent',
                    '&::-webkit-scrollbar': { display: 'none' },
                    padding: '1px 5px'
                }}

            >
                <List sx={{
                    opacity: isDragging ? 0.2 : 1,
                    transition: 'all .3s'

                }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }

                </List>
            </Paper>
        </div>
    )
}
