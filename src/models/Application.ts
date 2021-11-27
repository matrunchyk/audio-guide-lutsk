import Venue from '@/models/Venue';
import {ref} from "vue";
import venuesArr from "@/components/venuesArr.json";
import useMap from '@/components/use/useMap.ts';
import LocationRepository from "@/repositories/LocationRepository";

const images = require.context('@/assets/svg/venues/', false, /\.jpg$/);

export default class Application {
  static venues = ref<Venue[]>([]);
  static language = ref('uk');

  static locationRepository  = ref(new  LocationRepository());

  static menuOpen = ref(false);e

  static routeModalOpen = ref(false);

  static tutorialOpen = ref(false);

  static pinnedVenues = ref(0);

  static isSortedByRating = ref(false);

  static isRatingVenueForThankModal = ref(false);

  static ratingVenue = ref<Venue | null>(null);

  static detailVenue = ref<Venue | null>(null);

  static detailVenueMinimized = ref(false);

  static setLanguage(language: string) {
    this.language.value = language;
  }

  static setMenuOpen(menuOpen: boolean) {
    this.menuOpen.value = menuOpen;
  }

  static setRouteModalOpen(routeModalOpen: boolean) {
    this.routeModalOpen.value = routeModalOpen;
  }

  static setTutorialOpen(tutorialOpen: boolean) {
    this.tutorialOpen.value = tutorialOpen;
  }

  static resetRatingVenue() {
    this.ratingVenue.value = null;
  }

  static setThankYouModalOpen(isRatingVenueForThankModal: boolean) {
    this.isRatingVenueForThankModal.value = isRatingVenueForThankModal;
  }

  static resetDetailVenue() {
    this.detailVenue.value = null;
  }

  static setDetailVenueMinimized(minimized: boolean) {
    this.detailVenueMinimized.value = minimized;
  }

  static async setVenues() {
    await this.locationRepository.value.many();
    this.venues.value = this.locationRepository.value.dataset.all().map((item: any) => new Venue({
      index: item.uuid,
      image: item.imageUrl,
      localizations: item.localizations,
      icon: item.typeNum === 1 ? "/icons/icon-castle.svg" : item.typeNum === 2 ? "/icons/icon-church.svg" : item.typeNum === 3 ? "/icons/icon-museum.svg" : item.typeNum === 4 ? "/icons/icon-flag.svg" : "" ,
      isRecommended: item.isRecommended,
      rated: !!item.locationRatings.find(r => r.guestUuid === localStorage.getItem('guestUuid')),
      averageRating: item.locationRatings.reduce((sum, a) => sum + a.rating, 0) / item.locationRatings.length,
      rating: item.locationRatings.find(r => r.guestUuid === localStorage.getItem('guestUuid')) ? item.locationRatings.find(r => r.guestUuid === localStorage.getItem('guestUuid')).rating : 0,
      lat: item.latLng.lat,
      lng: item.latLng.lng,
      isFavorite: false,
      marker: null,
      markerIcon: item.typeNum === 1 ? "/marker-icons/marker-castle-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-icon.svg" : "" ,
      markerIconFavorite: item.typeNum === 1 ? "/marker-icons/marker-castle-red-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-red-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-red-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-red-icon.svg" : "" ,
      markerIconRecommended: item.typeNum === 1 ? "/marker-icons/marker-castle-recommended-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-recommended-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-recommended-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-recommended-icon.svg" : "" ,
      markerIconRecommendedFavorite: item.typeNum === 1 ? "/marker-icons/marker-castle-recommended-red-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-recommended-red-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-recommended-red-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-recommended-red-icon.svg" : "" ,
    }))
      .sort((a: any, b: any) => b.isRecommended - a.isRecommended)
      .map(
        (venue: any, index: any, arr: any) => venue.enhanceRecommended(
          !index && !!venue.isRecommended,
          !!venue.isRecommended && arr[index + 1] && !arr[index + 1].isRecommended,
        )
      );
    useMap().generateMarker();
  }
}
