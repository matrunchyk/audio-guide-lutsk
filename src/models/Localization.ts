import BaseModel from './BaseModel';
import Language from './Language';
import Location from './Location'

export default class Localization extends BaseModel {
  name: string;

  audioUrl: string;

  locationDescription: string;

  locationTitle: string;

  language: Language;

  location: Location

  defaults() {
    return {
      audioUrl: '',
      locationDescription: '',
      locationTitle: '',
      location: null,
      language: null,
    };
  }
}
