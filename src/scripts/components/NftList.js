import { getElementByClass } from '../utils/getElementByClass.js';
import { recalculateCrossPos } from '../utils/recalculateCrossPos.js';
import { removeClass } from '../utils/removeClass.js';
import { renderCardList } from '../utils/renderCardList.js';

export class NftList {
  constructor(element, data, description) {
    this.currentList = element;
    this.container = element.children[0];
    this.buttons = [...this.container.children].filter(el => el.nodeName === 'IMG');
    this.content = this.container.lastElementChild;
    this.data = data;
    this.description = description;
    this.isFiltered = false;
    this.thanksWindow = document.querySelector('.thanks-window');

    this.updateContent();

    this.initialHeight = element.scrollHeight - this.content.scrollHeight;
  }

  updateContent() {
    const { data, isFiltered, content } = this;
    const preparedData = data.filter(card => card.sold === false || !isFiltered);

    content.innerHTML = renderCardList(this.description, preparedData);

    const buyButtons = this.content.querySelectorAll('.nft-card__button');

    buyButtons.forEach(el => {
      el.addEventListener('click', () => {
        this.buyNft(+el.dataset.id);
      });
    });
  }

  buyNft(id) {
    const formWindow = document.querySelector('.buy-form');
    const form = formWindow.querySelector('.buy-form__form');
    formWindow.classList.add('buy-form--open');

    document.querySelector('.page__dark-background').classList.add('page__dark-background--visible');

    const submitHandler = (event) => {
      event.preventDefault();

      formWindow.classList.remove('buy-form--open');
      form.removeEventListener('submit', submitHandler);

      this.updateContent();

      const targetIndex = this.data.findIndex(el => el.id === id);
      this.data[targetIndex].sold = true;
      this.updateContent();

      this.thanksWindow.classList.add('thanks-window--open');

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

    const checkbox = currentList.querySelector('.checkbox');
    
    thanksWindow.querySelector('.thanks-window__button').addEventListener('click', () => {
      thanksWindow.classList.remove('thanks-window--open');
      document.querySelector('.page__dark-background').classList.remove('page__dark-background--visible');
    });

    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checkbox--checked');
      this.isFiltered = !this.isFiltered;
      this.updateContent();
    });

    getElementByClass('buy-form__cross').addEventListener('click', () => {
      document.querySelector('.buy-form').classList.remove('buy-form--open');
      document.querySelector('.page__dark-background').classList.remove('page__dark-background--visible');
    });

    document.querySelector('.buy-form__cross').addEventListener('click', () => {
      document.querySelector('.buy-form').classList.remove('buy-form--open');
      document.querySelector('.page__dark-background').classList.remove('page__dark-background--visible');
    });

    const { style } = container;

    style.maxHeight = initialHeight + 'px';
    recalculateCrossPos(buttons[1], initialHeight);

    window.addEventListener('resize', () => {
      this.initialHeight = currentList.scrollHeight - content.scrollHeight;
      style.maxHeight = container.scrollHeight - content.scrollHeight + 'px';
      removeClass(currentList, 'nft-list--silver-open');
      removeClass(buttons[1], 'nft-list__cross--open');
      removeClass(buttons[0], 'nft-list__arrow--open');
      recalculateCrossPos(buttons[1], initialHeight);
    });

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        button.classList.toggle(index === 0 ? 'nft-list__arrow--open' : 'nft-list__cross--open');

        if (!currentList.classList.contains('nft-list--silver-open')) {
          style.maxHeight = container.scrollHeight + 'px';
        } else {
          style.maxHeight = container.scrollHeight - content.scrollHeight + 'px';
        }

        currentList.classList.toggle('nft-list--silver-open');
      });
    });
  }
}