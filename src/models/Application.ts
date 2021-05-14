import Venue from '@/models/Venue';
import { ref } from "vue";

export default class Application {
  static language = ref('uk');

  static menuOpen = ref(false);

  static tutorialOpen = ref(false);

  static pinnedVenues = ref(0);

  static ratingVenue = ref<Venue | null>(null);

  static detailVenue = ref<Venue | null>(null);

  static setLanguage(language: string) {
    this.language.value = language;
  }

  static setMenuOpen(menuOpen: boolean) {
    this.menuOpen.value = menuOpen;
  }

  static setTutorialOpen(tutorialOpen: boolean) {
    this.tutorialOpen.value = tutorialOpen;
  }

  static resetRatingVenue() {
    this.ratingVenue.value = null;
  }

  static resetDetailVenue() {
    this.detailVenue.value = null;
  }
}
