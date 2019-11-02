import axios from 'axios';
import { NER_API_URL, SUMMARY_API_URL } from './urls';
import { NEREntitiesBackendResponse } from '@reservoir-dogs/model';

export type NERResponse = {
    ner: NEREntitiesBackendResponse;
};

export type SummaryResponse = {
    summary: string;
};

export const getSummary = async (text: string): Promise<string> => {
    try {
        const response = await axios.post<SummaryResponse>(
            SUMMARY_API_URL,
            {
                text,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data.summary;
    } catch (error) {
        console.error('error', error);
        throw error;
    }
};

export const getNER = async (text: string): Promise<NEREntitiesBackendResponse> => {
    try {
        const response = await axios.post<NERResponse>(
            NER_API_URL,
            {
                text,
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
