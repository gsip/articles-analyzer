const popupId = 'articles-summary-ner-popup';

const removePopup = (): void => {
    const popup = document.getElementById(popupId);

    if (!popup) {
        return;
    }

    document.body.removeChild(popup);
};

export const showPopup = (event: MouseEvent, text: string): void => {
    removePopup();
    const element = document.createElement('div');
    element.innerHTML = text;
    element.setAttribute('id', popupId);
    element.style.top = event.pageY + 'px';
    element.style.left = event.pageX + 'px';
    document.body.appendChild(element);
};
