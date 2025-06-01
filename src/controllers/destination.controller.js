import { getAccountDetailsByAccountId } from "../services/account.service.js";
import { destinationCreate, destinationDelete, destinationUpdate, getDestinationDetailsByAccountId, getDestinationDetailsById } from "../services/destination.service.js";

export const createDestination = async (req, res) => {
    try {
        const { url, httpMethod, headers, accountId } = req.body;
        if (!url || !httpMethod || !headers || !accountId) {
            return res.status(400).json({ error: 'All fields are required.' })
        }

        const account = await getAccountDetailsByAccountId(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        const createdDestination = await destinationCreate({
            url, httpMethod, headers, accountId
        })
        res.status(201).json({ message: 'Destination created successfully.', result: createdDestination });
    } catch (err) {
        console.error('Error in creating destination: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Destination id is missing.' })
        }

        const { url, httpMethod, headers, accountId } = req.body;
        if (!url || !httpMethod || !headers || !accountId) {
            return res.status(400).json({ error: 'All fields are required.' })
        }

        const account = await getAccountDetailsByAccountId(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        const updatedDestination = await destinationUpdate(id, { url, httpMethod, headers });
        res.status(200).json({ message: 'Destination updated successfully.', result: updatedDestination });
    } catch (err) {
        console.error('Error in creating destination: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Destination id is missing.' })
        }

        const destination = await getDestinationDetailsById(id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found for this id.' })
        }

        await destinationDelete(id)
        res.status(200).json({ message: 'Destination details deleted successfully.' });
    } catch (err) {
        console.error('Error in getting destination details: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getDestination = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Destination id is missing.' })
        }

        const destination = await getDestinationDetailsById(id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found for this id.' })
        }

        res.status(200).json({ message: 'Destination details fetched successfully.', result: destination });
    } catch (err) {
        console.error('Error in getting destination details: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getDestinationsForAccountId = async (req, res) => {
    try {
        const { accountId } = req.params;
        if (!accountId) {
            return res.status(400).json({ error: 'Account id is missing.' })
        }

        const account = await getAccountDetailsByAccountId(accountId);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        const destinations = await getDestinationDetailsByAccountId(accountId)
        res.status(200).json({ message: 'Destination details fetched successfully.', result: destinations });
    } catch (err) {
        console.error('Error in getting destination details: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}
