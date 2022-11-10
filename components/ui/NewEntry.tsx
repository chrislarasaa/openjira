import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched] = useState(false)

    const { addEntry } = useContext(EntriesContext)
    const { isAddingEntry, changeIsAddingState } = useContext(UIContext)

    const onTexFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {

        if (inputValue.length == 0) return

        addEntry(inputValue)
        setInputValue('')
        changeIsAddingState(false)
        setTouched(false)
    }

    return (
        <Box sx={{
            marginBottom: 2,
            paddingX: 1.5
        }}>

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTexFieldChanges}
                            onBlur={() => setTouched(true)}
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                onClick={() => changeIsAddingState(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) :
                    (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => changeIsAddingState(true)}
                        >
                            Agregar tarea
                        </Button>
                    )
            }
        </Box>
    )
}
