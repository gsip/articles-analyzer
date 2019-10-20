type Message = {
    type: string;
    payload?: any;
};

export class Messenger<T extends Message> {
    allSubscribers: Map<string, Function[]> = new Map();

    constructor() {
        chrome.runtime.onMessage.addListener((request: T, _sender, sendResponse: (action: T) => void) => {
            const subscribers = this.allSubscribers.get(request.type);
            if (subscribers) {
                subscribers.forEach(async (callback) => {
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

    subscribe<P extends T>(actionType: P['type'], callback: Function): void {
        if (!this.allSubscribers.has(actionType)) {
            this.allSubscribers.set(actionType, []);
        }

        const subscribers = this.allSubscribers.get(actionType) as Function[];

        subscribers.push(callback);
    }
}
