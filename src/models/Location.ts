import BaseModel from './BaseModel';
import Localization from "./Localization";

export default class Location extends BaseModel {

  imageData: string;

  isRecommended: boolean;

  isEnabled: boolean;

  localizations: Localization[];

  latLng: { lat: string, lng: string };

  defaults() {
    return {
      latLng: null,
      localizations: [],
      isEnabled: false,
      isRecommended: false,
      imageData: '',
    };
  }ee
}