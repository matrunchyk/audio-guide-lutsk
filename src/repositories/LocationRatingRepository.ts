import BaseRepository from './BaseRepository';
import LocationRating from "@/models/LocationRating";

export default class LocationRepository extends BaseRepository<LocationRating> {
    model = LocationRating;

    // @ts-ignore
    fetchOneQuery = () => '';

    // @ts-ignore
    fetchManyQuery = () => '';
}