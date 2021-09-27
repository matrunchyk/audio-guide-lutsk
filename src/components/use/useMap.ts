let google: any = null;
let map: any = null;

export default function takeData() {
  function initMap(googleData: any, mapData: any) {
    google = googleData;
    map = mapData;
  }

  function getMapData() {
    return {
      google,
      map,
    }
  }

  return {
    initMap,
    getMapData,
  };
}