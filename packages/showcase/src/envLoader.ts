import * as dotenv from 'dotenv';
import * as path from 'path';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();

const destination = path.resolve(process.cwd(), '.env');
const options = { destination };

export async function loadConfiguration(): Promise<void> {
    const bucketName = process.env.CONFIG_BUCKET || '';
    const envConfigurationFile = process.env.CONFIG_FILE || '';

    await storage
        .bucket(bucketName)
        .file(envConfigurationFile)
        .download(options);
    console.log(`gs://${bucketName}/${envConfigurationFile} downloaded to ${destination}`);

    const config = dotenv.config({ path: destination });

    if (config.error) {
        throw config.error;
    }
}
