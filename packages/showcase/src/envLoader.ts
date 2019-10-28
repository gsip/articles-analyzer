import * as dotenv from 'dotenv';
import * as path from 'path';
import { Storage } from '@google-cloud/storage';
import { existsSync } from 'fs';
import { getConfigBucket, getConfigFilename } from './constProvider';

const storage = new Storage();

const destination = path.resolve(process.cwd(), '.env');
const options = { destination };

async function downloadConfig(): Promise<void> {
    const bucketName = getConfigBucket();
    const envConfigurationFile = getConfigFilename();

    await storage
        .bucket(bucketName)
        .file(envConfigurationFile)
        .download(options);
    console.log(`gs://${bucketName}/${envConfigurationFile} downloaded to ${destination}`);
}

export async function loadEnv(): Promise<void> {
    try {
        if (!existsSync(destination)) {
            await downloadConfig();
        }
    } catch (err) {
        console.error(err);
    }

    const config = dotenv.config({ path: destination });

    if (config.error) {
        throw config.error;
    }
    console.log('ENV configuration loaded');
}
