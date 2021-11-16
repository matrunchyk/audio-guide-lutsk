import BaseRepository from './BaseRepository';
import Location from "../models/Location";

export default class LocationRepository extends BaseRepository<Location> {
  model = Location;

  // @ts-ignore
  fetchOneQuery = () => import('../gql/locations/queries/fetchLocation.graphql');

  // @ts-ignore
  fetchManyQuery = () => import('../gql/locations/queries/fetchLocations.graphql');
}