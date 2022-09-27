import { nft as nftFromServer } from '../api/nft.js';
import { NftList } from './components/NftList.js';

const silverList = document.querySelector('.nft-list--silver');
const silverNft = nftFromServer.filter(nft => nft.type === 'silver');

const silverListComponent = new NftList(
  silverList, 
  silverNft, 
  'You get: <br> - NFT poster + sponsor logo on web page',
);

silverListComponent.addListeners();