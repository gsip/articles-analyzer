import $ from 'jquery';
import { EXTRACT_API_URL } from './urls';
import { EntitiesBackendResponse } from '../types';

type Response = {
    ents: EntitiesBackendResponse;
};

export const ExtractText = (text: string): Promise<Response> => {
    return new Promise<Response>((resolve, reject): void => {
        $.ajax({
            type: 'POST',
            url: EXTRACT_API_URL,
            contentType: 'text/plain',
            data: text,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
            },
            error: (_request, error) => {
                reject(error);
            },
        }).done(resolve);
    });
};
