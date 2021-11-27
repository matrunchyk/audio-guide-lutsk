import BaseModel from './BaseModel';
import Location from "@/models/Location";
// @ts-ignore
import createLocationMutationRating from "@/gql/location-ratings/mutations/createLocationRating.graphql";
// @ts-ignore
import updateLocationMutationRating from "@/gql/location-ratings/mutations/updateLocationRating.graphql";

export default class LocationRating extends BaseModel {
    createMutation = createLocationMutationRating;

    updateMutation = updateLocationMutationRating;

    guestUuid: string;

    location: Location

    rating: number;

    locationUuid: string;

    defaults() {
        return {
            guestUuid: '',
            location: null,
            rating: 0,
        };
    }
}
