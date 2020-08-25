import staqConfig from '../staq'
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

export const getSecret = async (secretName) => {
    const projectNumber = staqConfig.get('gcpProjectNumber')
    const secretPath = `projects/${projectNumber}/secrets/${secretName}/versions/latest`
    const smClient = new SecretManagerServiceClient()
    const [version] = await smClient.accessSecretVersion({
        name: secretPath
    })
    return version.payload.data.toString()
}
