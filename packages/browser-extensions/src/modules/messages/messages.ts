import { ExtractActionsType } from './actions/extract';
import { MessengerCallback, MessengerInterface } from '../types';

export const DEFAULT_MESSENGER_NAME = 'DEFAULT_MESSENGER_NAME';

export class Messenger<T extends ExtractActionsType = ExtractActionsType> implements MessengerInterface<T> {
    allSubscribers: Map<string, MessengerCallback<T, T>[]> = new Map<string, MessengerCallback<T, T>[]>();

    constructor(name: string = DEFAULT_MESSENGER_NAME) {
        chrome.runtime.onMessage.addListener(
            (request: { type: string; payload: T }, _sender, sendResponse: (action: T) => void) => {
                if (request && request.type === name) {
                    const subscribers = this.allSubscribers.get(request.payload.type);
                    if (subscribers) {
                        subscribers.map(async (callback) => {
                            const result = await callback(request.payload);
                            if (result) {
                                sendResponse(result);
                            }
                        });
                    }
                }
                return true;
            },
        );
    }

    send<D>(action: T): Promise<D> {
        return new Promise<D>((resolve) => {
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
