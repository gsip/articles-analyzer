import { debounce } from 'lodash-es';

const popupId = 'articles-summary-ner-popup';

export const removePopup = (): void => {
    const popup = document.getElementById(popupId);

    if (!popup) {
        return;
    }

    document.body.removeChild(popup);
};

export const showPopup = ({ pageY, pageX }: Record<string, number>, content: string): void => {
    removePopup();
    const element = document.createElement('div');
    element.innerHTML = content;
    element.setAttribute('id', popupId);
    element.style.top = pageY + 'px';
    element.style.left = pageX + 'px';
    document.body.appendChild(element);
};

document.addEventListener(
    'mousemove',
    debounce((event) => {
        if (!event.target) {
            return;
        }

        const eventTarget = event.target as HTMLElement;

        if (eventTarget.closest('.articles-summary-keyword') || eventTarget.closest(`#${popupId}`)) {
            return;
        }

        removePopup();
    }, 300),
);
