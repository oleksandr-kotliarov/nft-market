import { nft as nftFromServer } from '../../api/nft.js';
import { NftList } from '../components/NftList.js';

export function createNftList(element, type, description) {
  const filteredData = nftFromServer.filter(nft => nft.type === type);

  const nftList = new NftList(
    element,
    filteredData,
    description,
  );

  nftList.addListeners();
}