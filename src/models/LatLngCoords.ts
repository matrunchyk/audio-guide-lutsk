import BaseModel from './BaseModel';

export default class LatLngCoords extends BaseModel {
  lat: string;

  lng: string;

  defaults() {
    return {
      lat: '',
      lng: '',
    };
  }
}