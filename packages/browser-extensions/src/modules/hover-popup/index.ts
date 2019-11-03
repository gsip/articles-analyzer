const popupId = 'articles-summary-ner-popup';

const removePopup = (): void => {
    const popup = document.getElementById(popupId);

    if (!popup) {
        return;
    }

    document.body.removeChild(popup);
};

export const showPopup = (event: MouseEvent, content: string): void => {
    removePopup();
    const element = document.createElement('div');
    element.innerHTML = content;
    element.setAttribute('id', popupId);
    element.style.top = event.pageY + 'px';
    element.style.left = event.pageX + 'px';
    document.body.appendChild(element);
};
