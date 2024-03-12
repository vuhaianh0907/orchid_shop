import {User} from '../models/user'

export const Plant = {
    id: '',
    name: '',
    quantity: 0,
    description: '',
    image: '',
    startingBid: 0,
    seller: User,
    isAvailableForAuction: undefined,
    averageRating: 0
  };
  
  export const PlantListData = {
    plants: [],
    totalCount: 0,
    pageCount: 0
  };
  