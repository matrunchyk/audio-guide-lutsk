import BaseModel from './BaseModel';
import Localization from "./Localization";
import LocationRating from "@/models/LocationRating";

export default class Location extends BaseModel {

  imageUrl: string;

  isRecommended: boolean;

  isEnabled: boolean;

  localizations: Localization[];

  typeNum: number

  locationRatings: LocationRating[];

  latLng: { lat: string, lng: string };

  defaults() {
    return {
      latLng: null,
      localizations: [],
      isEnabled: false,
      isRecommended: false,
      imageUrl: '',
      typeNum: 0,
    };
  }
}
