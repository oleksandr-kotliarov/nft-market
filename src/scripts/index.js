import { createNftList } from './utils/createNftList.js';
import { getElementByClass } from './utils/getElementByClass.js';

createNftList(
  getElementByClass('nft-list--silver'),
  'silver',
  'You get: <br> - NFT poster + sponsor logo on web page'
);

createNftList(
  getElementByClass('nft-list--gold'),
  'gold',
  'You get: <br> - NFT poster + sponsor logo on web page <br> - Invitation for 2 people to Zurich concert pre-party at Kongresshaus LUX Restaurant & Bar '
);

createNftList(
  getElementByClass('nft-list--platinum'),
  'platinum',
  'You get: <br> - NFT poster + sponsor logo on web page <br> - Invitation for 2 people to Zurich concert pre-party at Kongresshaus LUX Restaurant & Bar '
);