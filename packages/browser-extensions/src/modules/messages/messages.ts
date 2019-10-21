import { MessengerCallback, MessengerInterface } from '../types';
import { ActionsType } from './actions';

export const DEFAULT_MESSENGER_NAME = 'DEFAULT_MESSENGER_NAME';

export class Messenger<T extends ActionsType = ActionsType> implements MessengerInterface<T> {
    allSubscribers: Map<string, MessengerCallback<T, T>[]> = new Map<string, MessengerCallback<T, T>[]>();

    constructor() {
        chrome.runtime.onMessage.addListener((request: T, _sender, sendResponse: (action: T) => void) => {
            const subscribers = this.allSubscribers.get(request.type);
            if (subscribers) {
                subscribers.map(async (callback) => {
                    const result = await callback(request);
                    if (sendResponse) {
                        sendResponse(result);
                    }
                });
            }

            return true;
        });
    }

    send<D>(action: T): Promise<D> {
        return new Promise<D>((resolve): void => {
            chrome.runtime.sendMessage(action, resolve);
        });
    }

    subscribe<P extends T, R extends T>(actionType: P['type'], callback: MessengerCallback<P, R>): void {
        if (!this.allSubscribers.has(actionType)) {
            this.allSubscribers.set(actionType, []);
        }

        const subscribers = (this.allSubscribers.get(actionType) as unknown) as MessengerCallback<P, R>[];
        subscribers.push(callback);
    }
}
