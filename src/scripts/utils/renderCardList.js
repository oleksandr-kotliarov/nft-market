export function renderCardList(description, data) {
  return (
    `
      <h2 class="nft-list__benefits">${description}</h2>
      <div class="nft-list__content-items">
      ${data.map(nft => (
      `<article class="nft-card ${nft.sold ? ' nft-card--sold' : ''}">
        <img src="${nft.image}" alt="nft" class="nft-card__image">
        <h2 class="nft-card__price">${nft.price}₣</h2>
        <button class="buy-button nft-card__button" data-id="${nft.id}"${nft.sold ? ' disabled' : ''}>
          Buy NFT
        </button>
      </article>`
    )).join('')}
      </div>
    `
  );
}