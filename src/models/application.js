import { ref } from "vue";

export default class Application {
  static language = ref(null);

  static setLanguage(lang) {
    this.language = lang;
  }
}
