import Application from '@/models/Application';

export default class Venue {
  public index = 0;

  public name = '';

  public description = '';

  public image = '';

  public icon = '';

  public audioFile = '';

  public isRecommended = false;

  public recommended = 0;

  public rated = false;

  public rating = 0;

  public pinned = false;

  public firstRecommended = false;

  public lastRecommended = false;

  public lat = '';

  public lng = '';

  public marker: google.maps.Marker | null = null;

  public isFavorite = false;

  public markerIcon = '';

  public markerIconFavorite = '';

  public markerIconRecommended = '';

  public markerIconRecommendedFavorite = '';

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

  public showDetail(minimized = false) {
    Application.detailVenueMinimized.value = minimized;
    Application.detailVenue.value = this;
  }

  public toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (!this.marker) return;
    if (this.isFavorite && this.isRecommended) {
      this.marker.setIcon(this.markerIconRecommendedFavorite);
    } else if (this.isFavorite) {
      this.marker.setIcon(this.markerIconFavorite);
    } else if (this.isRecommended) {
      this.marker.setIcon(this.markerIconRecommended);
    } else {
      this.marker.setIcon(this.markerIcon);
    }
  }
}
