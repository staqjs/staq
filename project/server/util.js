import staqConfig from '../staq'
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

export const getSecret = (secretName) => {
    const projectNumber = staqConfig.get('gcpProjectNumber')
    const secretName = `projects/${projectNumber}/secrets/${secretName}/versions/latest`
    const smClient = new SecretManagerServiceClient()
    const [version] = await smClient.accessSecretVersion({
        name: secretName
    })
    return version.payload.data.toString()
}
