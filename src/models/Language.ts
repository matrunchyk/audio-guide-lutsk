import BaseModel from './BaseModel';
import Localization from "./Localization";

export default class Language extends BaseModel {

  code: string;

  isEnabled: boolean;

  localizations: Localization[];

  title: string;

  defaults() {
    return {
      title: '',
      localizations: [],
      isEnabled: false,
      code: '',
    };
  }
}