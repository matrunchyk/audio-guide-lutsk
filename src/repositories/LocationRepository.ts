import BaseRepository from './BaseRepository';
import Location from "../models/Location";
import collect from 'collect.js';

export default class LocationRepository extends BaseRepository<Location> {
  model = Location;

  // @ts-ignore
  fetchOneQuery = () => import('../gql/locations/queries/fetchLocation.graphql');

  // @ts-ignore
  fetchManyQuery = () => import('../gql/locations/queries/fetchLocations.graphql');

  async processResponse(responseType, data) {
    this.dataset = collect(data);
    return this.dataset;
  }
}
