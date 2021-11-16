import BaseModel from './BaseModel';
import Language from './Language';
import Location from './Location'

export default class Localization extends BaseModel {

  audioData: string;

  locationDescription: string;

  locationTitle: string;

  language: Language;

  location: Location

  defaults() {
    return {
      audioData: '',
      locationDescription: '',
      locationTitle: '',
      location: null,
      language: null,
    };
  }
}