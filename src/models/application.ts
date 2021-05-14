import { ref } from "vue";

export default class Application {
  static language = ref('uk');

  static menuOpen = ref(false);

  static tutorialOpen = ref(false);

  static pinnedLocations = ref(0);

  static setLanguage(language: string) {
    this.language.value = language;
  }

  static setMenuOpen(menuOpen: boolean) {
    this.menuOpen.value = menuOpen;
  }

  static setTutorialOpen(tutorialOpen: boolean) {
    this.tutorialOpen.value = tutorialOpen;
  }
}
