import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../../database';
import { EntryStatus } from '../../../../../interfaces';
import { EntryModel, IEntry } from '../../../../../models';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query as { id: string }

    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' })

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res, id)

        case 'GET':
            return getEntry(req, res, id)

        default:
            return res.status(404).json({ message: 'Not found' })

    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {

    try {

        const { description, status } = req.body

        const validStatus = ['pending', 'in-progress', 'finished']

        if (!(validStatus.includes(status))) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        await db.connect()

        const entry = await EntryModel.findByIdAndUpdate(id, { description, status }, {
            runValidators: true,
            new: true
        })

        if (!entry) {
            return res.status(404).json({ message: 'Not found' })
        }

        await db.disconnect()

        return res.status(201).json(entry)

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, id: string) => {
    try {
        await db.connect()
        const entry =await EntryModel.findById(id)
        await db.disconnect()

        if(!entry){
            return res.status(400).json({message: 'Entry does not exists'})
        }

        return res.status(200).json(entry)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}

