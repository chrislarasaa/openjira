import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { EntryModel, IEntry } from '../../../../models';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getEntries(res)

        case 'POST':
            return addEntry(req, res)

        default:
            return res.status(404).json({ message: 'Not found' })

    }

}

const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect()

    const entries = await EntryModel.find().sort({
        createdAt: 'ascending'
    })


    await db.disconnect()

    res.status(200).json(entries)
}
const addEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description } = req.body

    if (typeof description == 'undefined') {
        return res.status(400).json({ message: 'Description is required' })
    }

    const entry = new EntryModel({ description })
    
    try {
        await db.connect()
        await entry.save()
        await db.disconnect()
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }


    return res.status(201).json(entry)
}
