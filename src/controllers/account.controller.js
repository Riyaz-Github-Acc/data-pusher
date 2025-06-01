import { accountCreate, accountDelete, accountUpdate, getAccountDetailsByAccountId, getAccountDetailsByEmail } from "../services/account.service.js";

export const createAccount = async (req, res) => {
    try {
        const { emailId, accountName, website } = req.body;
        if (!emailId || !accountName) {
            return res.status(400).json({ error: 'Email id and account name are required fields.' })
        }

        const emailExists = await getAccountDetailsByEmail(emailId)
        if (emailExists) {
            return res.status(400).json({ error: 'Email id already in use. Please use different mail id.' })
        }

        const createdAccount = await accountCreate({
            emailId, accountName, website: website || null
        })
        res.status(201).json({ message: 'Account created successfully.', result: createdAccount });
    } catch (err) {
        console.error('Error in creating error: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Account id is missing.' })
        }

        const { emailId, accountName, website } = req.body;
        if (!emailId || !accountName) {
            return res.status(400).json({ error: 'Email id and account name are required fields.' })
        }

        const account = await getAccountDetailsByAccountId(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        const emailExists = await getAccountDetailsByEmail(emailId, id)
        if (emailExists) {
            return res.status(400).json({ error: 'Email id already in use. Please use different mail id.' })
        }

        const updatedAccount = await accountUpdate({
            accountId: id,
            emailId,
            accountName,
            website: website || null
        });
        res.status(200).json({ message: 'Account updated successfully.', result: updatedAccount });
    } catch (err) {
        console.error('Error in creating error: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Account id is missing.' })
        }

        const account = await getAccountDetailsByAccountId(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        await accountDelete(id);
        res.status(200).json({ message: 'Account details deleted successfully.' });
    } catch (err) {
        console.error('Error in getting account details error: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getAccount = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Account id is missing.' })
        }

        const account = await getAccountDetailsByAccountId(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' })
        }

        res.status(200).json({ message: 'Account details fetched successfully.', result: account });
    } catch (err) {
        console.error('Error in getting account details error: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}

