import collect from 'collect.js';
import BaseRepository from './BaseRepository';
import Language from "../models/Language";

export default class LanguageRepository extends BaseRepository<Language> {
  constructor() {
    super();
  }
  model = Language;

  // @ts-ignore
  fetchOneQuery = () => import('@/gql/languages/queries/fetchLanguage.graphql');

  // @ts-ignore
  fetchManyQuery = () => import('@/gql/languages/queries/fetchLanguages.graphql');

  async processResponse(responseType, data) {
    this.dataset = collect(data);
    return this.dataset;
  }
}
