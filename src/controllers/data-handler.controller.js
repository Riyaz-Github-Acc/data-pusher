import axios from "axios";
import { getAccountDetailsBySecretToken } from "../services/account.service.js";
import { getDestinationDetailsByAccountId } from "../services/destination.service.js";

export const postDataHandler = async (req, res) => {
    try {
        const incomingData = req.body
        if (req.method !== 'POST' || !incomingData || typeof incomingData !== 'object') {
            return res.status(400).json({ error: 'Invalid Data' });
        }

        const appSecretToken = req.headers['cl-x-token'] || req.headers['CL-X-TOKEN'];
        if (!appSecretToken) {
            return res.status(401).json({ error: 'Un Authenticate' });
        }

        const account = await getAccountDetailsBySecretToken(appSecretToken);
        if (!account) {
            return res.status(404).json({ error: 'Account not found for this id.' });
        }

        const destinations = await getDestinationDetailsByAccountId(account.accountId);
        if (!destinations || destinations.length === 0) {
            return res.status(200).json({ message: 'No destinations found for this account.' });
        }

        let results = [];
        for (const dest of destinations) {
            try {
                const { url, httpMethod, headers, id: destinationId } = dest;
                let response;

                if (httpMethod.toUpperCase() === 'GET') {
                    // const fullUrl = `${url}?${new URLSearchParams(incomingData).toString()}`;
                    // console.log('GET Request URL:', fullUrl);

                    response = await axios.get(url, {
                        params: incomingData,
                        headers: headers,
                    });
                } else if (httpMethod.toUpperCase() === 'POST' || httpMethod.toUpperCase() === 'PUT' || httpMethod.toUpperCase() === 'PATCH') {
                    response = await axios({
                        url: url,
                        method: httpMethod,
                        data: incomingData,
                        headers: headers,
                    });
                } else {
                    console.warn(`Unsupported HTTP method: ${httpMethod} for URL: ${url}`);
                    results.push({
                        destinationId: destinationId || url,
                        status: 'skipped',
                        reason: `Unsupported HTTP method: ${httpMethod} for URL: ${url}`
                    });
                    continue;
                }

                results.push({
                    destinationId: destinationId || url,
                    status: 'success',
                    statusCode: response.status,
                    response: response.data
                });

            } catch (err) {
                console.error(`Error sending data to destination ${dest.url}:`, err.message);
                results.push({
                    destinationId: dest.id || dest.url,
                    status: 'error',
                    error: err.response?.data || err.message,
                    statusCode: err.response?.status
                });
            }
        }

        const successCount = results.filter(r => r.status === 'success').length;
        const errorCount = results.filter(r => r.status === 'error').length;
        const skipCount = results.filter(r => r.status === 'skipped').length;

        res.status(200).json({
            message: "Data processing completed",
            summary: {
                total: destinations.length,
                successful: successCount,
                failed: errorCount,
                skipped: skipCount
            },
            results: results
        });
    } catch (err) {
        console.error('Error in sending data in data handler: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }
}