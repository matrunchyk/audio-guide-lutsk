import useMap from '@/components/use/useMap';
import Venue from '@/models/Venue';
import LocationRepository from "@/repositories/LocationRepository";
import { Ref, ref } from "vue";
import { VueI18n } from 'vue-i18n';

export default class Application {
  static venues = ref<Venue[]>([]) as Ref<Venue[]>;

  static loading = ref(true);

  static language = ref('uk');

  static locationRepository = ref(new LocationRepository()) as Ref<LocationRepository>;

  static menuOpen = ref(false);

  static routeModalOpen = ref(false);

  static tutorialOpen = ref(false);

  static pinnedVenues = ref(0);

  static isSortedByRating = ref(false);

  static isRatingVenueForThankModal = ref(false);

  static ratingVenue = ref<Venue | null>(null) as Ref<Venue | null>;

  static detailVenue = ref<Venue | null>(null) as Ref<Venue | null>;

  static detailVenueMinimized = ref(false);

  static i18n: VueI18n;

  static showLoader() {
    this.loading.value = true;
  }

  static hideLoader() {
    this.loading.value = false;
  }

  static setLanguage(language: string) {
    this.language.value = language;
    this.i18n.locale = language;
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

    const guestUuid = localStorage.getItem('guestUuid') || '';

    this.venues.value = this.locationRepository.value.dataset.all().map((item: any) => {
      const ratings = item.locationRatings || [];

      return new Venue({
        uuid: item.uuid,
        image: item.imageUrl,
        localizations: item.localizations,
        icon: item.typeNum === 1 ? "img/icons/icon-castle.svg" : item.typeNum === 2 ? "img/icons/icon-church.svg" : item.typeNum === 3 ? "img/icons/icon-museum.svg" : item.typeNum === 4 ? "img/icons/icon-flag.svg" : "",
        isRecommended: item.isRecommended,
        rated: !!ratings.find(r => r.guestUuid === guestUuid),
        averageRating: ratings.reduce((sum, a) => sum + a.rating, 0) / ratings.length,
        rating: ratings.find(r => r.guestUuid === guestUuid) ? ratings.find(r => r.guestUuid === guestUuid).rating : 0,
        lat: item.latLng?.lat,
        lng: item.latLng?.lng,
        isFavorite: false,
        marker: null,
        markerIcon: item.typeNum === 1 ? "/marker-icons/marker-castle-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-icon.svg" : "",
        markerIconFavorite: item.typeNum === 1 ? "/marker-icons/marker-castle-red-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-red-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-red-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-red-icon.svg" : "",
        markerIconRecommended: item.typeNum === 1 ? "/marker-icons/marker-castle-recommended-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-recommended-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-recommended-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-recommended-icon.svg" : "",
        markerIconRecommendedFavorite: item.typeNum === 1 ? "/marker-icons/marker-castle-recommended-red-icon.svg" : item.typeNum === 2 ? "/marker-icons/marker-church-recommended-red-icon.svg" : item.typeNum === 3 ? "/marker-icons/marker-museum-recommended-red-icon.svg" : item.typeNum === 4 ? "/marker-icons/marker-flag-recommended-red-icon.svg" : "",
      })
    })
      .sort((a: Venue, b: Venue) => Number(b.isRecommended) - Number(a.isRecommended))
      .map(
        (venue: Venue, index: number, arr: Venue[]) => venue.enhanceRecommended(
          !index && venue.isRecommended,
          venue.isRecommended && arr[index + 1] && !arr[index + 1].isRecommended,
        )
      );
    useMap().generateMarker();
  }

  static setI18n(i18n: VueI18n) {
    this.i18n = i18n;
  }
}
