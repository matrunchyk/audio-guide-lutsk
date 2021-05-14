import Application from '@/models/Application';

export default class Venue {
  public index = 0;

  public name = '';

  public image = '';

  public icon = '';

  public recommended = 0;

  public rated = false;

  public rating = 0;

  public pinned = false;

  public firstRecommended = false;

  public lastRecommended = false;

  constructor(props: Partial<Venue>) {
    Object.assign(this, props);

    return this;
  }

  public enhanceRecommended(firstRecommended: boolean, lastRecommended: boolean) {
    this.firstRecommended = firstRecommended;
    this.lastRecommended = lastRecommended;

    return this;
  }

  public showRatingModal() {
    Application.ratingVenue.value = this;
  }

  public showDetail() {
    Application.detailVenue.value = this;
  }
}
