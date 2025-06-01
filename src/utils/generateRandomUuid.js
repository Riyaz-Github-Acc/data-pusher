import { randomBytes, randomUUID } from "crypto";

export const generateRandomUuid = () => {
    return randomUUID()
}

export const generateAppSecretToken = () => {
    return randomBytes(32).toString('hex')
}