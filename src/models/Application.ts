import Venue from '@/models/Venue';
import {ref} from "vue";
import venuesArr from "@/components/venuesArr.json";

const images = require.context('@/assets/svg/venues/', false, /\.jpg$/);

export default class Application {
  static venues = ref<Venue[]>([]);
  static language = ref('uk');

  static menuOpen = ref(false);

  static routeModalOpen = ref(false);

  static tutorialOpen = ref(false);

  static pinnedVenues = ref(0);

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

  static setVenues() {
    this.venues.value = venuesArr.map((item: any) => new Venue({
      index: item.index,
      name: item.name,
      description: item.description,
      image: images(`./${item.index}.jpg`).default,
      icon: item.icon,
      audioFile: item.audioFile,
      isRecommended: item.isRecommended,
      recommended: item.recommended,
      rated: item.rated,
      rating: item.rating,
      pinned: item.pinned,
      lat: item.latLng.lat,
      lng: item.latLng.lng,
      isFavorite: item.isFavorite,
      marker: item.marker,
      markerIcon: item.markerIcon,
      markerIconFavorite: item.markerIconFavorite,
      markerIconRecommended: item.markerIconRecommended,
      markerIconRecommendedFavorite: item.markerIconRecommendedFavorite,
    }))
      .sort((a: any, b: any) => b.recommended - a.recommended)
      .map(
        (venue: any, index: any, arr: any) => venue.enhanceRecommended(
          !index && !!venue.recommended,
          !!venue.recommended && arr[index + 1] && !arr[index + 1].recommended,
        )
      );
  }
}
