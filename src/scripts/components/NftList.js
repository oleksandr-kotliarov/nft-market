import { addClass } from '../utils/addClass.js';
import { getElementByClass } from '../utils/getElementByClass.js';
import { recalculateCrossPos } from '../utils/recalculateCrossPos.js';
import { removeClass } from '../utils/removeClass.js';
import { renderCardList } from '../utils/renderCardList.js';
import { toggleClass } from '../utils/toggleClass.js';

export class NftList {
  constructor(element, data, description) {
    this.currentList = element;
    this.container = element.children[0];
    this.buttons = [...this.container.children].filter(el => el.nodeName === 'IMG');
    this.content = this.container.lastElementChild;
    this.data = data;
    this.description = description;
    this.isFiltered = false;
    this.thanksWindow = getElementByClass('thanks-window');

    this.updateContent();

    this.initialHeight = element.scrollHeight - this.content.scrollHeight;
  }

  updateContent() {
    const { data, isFiltered, content, currentList } = this;
    const preparedData = data.filter(card => card.sold === false || !isFiltered);

    content.innerHTML = renderCardList(this.description, preparedData);

    const buyButtons = this.content.querySelectorAll('.nft-card__button');

    getElementByClass(
      'nft-list__current-amount',
      currentList
    ).innerText = data.filter(card => card.sold === false).length;

    buyButtons.forEach(el => {
      el.addEventListener('click', () => {
        this.buyNft(+el.dataset.id);
      });
    });
  }

  buyNft(id) {
    const {
      thanksWindow,
      data,
    } = this;

    const formWindow = document.querySelector('.buy-form');
    const form = formWindow.querySelector('.buy-form__form');

    addClass(formWindow, 'buy-form--open');

    addClass(getElementByClass('page__dark-background'), 'page__dark-background--visible');

    const submitHandler = (event) => {
      event.preventDefault();

      removeClass(formWindow, 'buy-form--open');

      form.removeEventListener('submit', submitHandler);

      const targetIndex = this.data.findIndex(el => el.id === id);
      data[targetIndex].sold = true;
      this.updateContent();

      getElementByClass('thanks-window__nft-name', thanksWindow).innerText = data[targetIndex].name;

      addClass(thanksWindow, 'thanks-window--open');

      // i dont`t clear the form because i think that it will be more comfortable for user
    };

    form.addEventListener('submit', submitHandler);
  }

  addListeners() {
    const {
      container,
      initialHeight,
      currentList,
      buttons,
      content,
      thanksWindow,
    } = this;

    const checkbox = getElementByClass('checkbox', currentList);

    getElementByClass('thanks-window__button', thanksWindow).addEventListener('click', () => {
      removeClass(thanksWindow, 'thanks-window--open');
      removeClass(getElementByClass('page__dark-background'), 'page__dark-background--visible');
    });

    checkbox.addEventListener('click', () => {
      toggleClass(checkbox, 'checkbox--checked');
      this.isFiltered = !this.isFiltered;
      this.updateContent();
    });

    getElementByClass('buy-form__cross').addEventListener('click', () => {
      removeClass(getElementByClass('buy-form'), 'buy-form--open');
      removeClass(getElementByClass('page__dark-background'), 'page__dark-background--visible');
    });

    const { style } = container;

    style.maxHeight = initialHeight + 'px';
    recalculateCrossPos(buttons[1], initialHeight);

    window.addEventListener('resize', () => {
      this.initialHeight = currentList.scrollHeight - content.scrollHeight;
      style.maxHeight = container.scrollHeight - content.scrollHeight + 'px';
      removeClass(currentList, 'nft-list--open');
      removeClass(buttons[1], 'nft-list__cross--open');
      removeClass(buttons[0], 'nft-list__arrow--open');
      recalculateCrossPos(buttons[1], initialHeight);
    });

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const currentClass = index === 0 ? 'nft-list__arrow--open' : 'nft-list__cross--open'
        toggleClass(button, currentClass);

        if (!currentList.classList.contains('nft-list--open')) {
          style.maxHeight = container.scrollHeight + 'px';
        } else {
          style.maxHeight = container.scrollHeight - content.scrollHeight + 'px';
        }

        toggleClass(currentList, 'nft-list--open');
      });
    });
  }
}