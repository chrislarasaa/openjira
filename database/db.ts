import mongoose from 'mongoose'

const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongooConnection.isConnected) {
        console.log('Already connected')
        return
    }

    if (mongoose.connections.length > 0) {
        mongooConnection.isConnected = mongoose.connections[0].readyState

        if (mongooConnection.isConnected === 1) {
            console.log('Using the same connection')
            return
        }
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING || '')
    mongooConnection.isConnected = 1
    console.log(`Connected to mongo db: ${process.env.MONGO_CONNECTION_STRING}`)
}

export const disconnect = async() => {

    if (mongooConnection.isConnected === 0) return
    await mongoose.disconnect()
    mongooConnection.isConnected = 0

    console.log('Disconnecting from mongo db')
}