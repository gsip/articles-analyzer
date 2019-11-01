import axios from 'axios';
import { EXTRACT_API_URL } from './urls';
import { NEREntitiesBackendResponse } from '@reservoir-dogs/model';

type Response = {
    ner: NEREntitiesBackendResponse;
};

export const ExtractText = async (text: string): Promise<NEREntitiesBackendResponse> => {
    try {
        const response = await axios.post<Response>(
            EXTRACT_API_URL,
            {
                text: JSON.stringify(text),
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data.ner;
    } catch (error) {
        console.error('error', error);
        throw error;
    }
};
