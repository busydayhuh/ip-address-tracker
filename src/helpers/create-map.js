export let map = null;
export const markerElement = document.createElement("div");
markerElement.className = "marker-class";

export async function createMap(lng, lat) {
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
  } = ymaps3;

  map = new YMap(document.getElementById("map"), {
    location: {
      center: [lng, lat],
      zoom: 10,
    },
    showScaleInCopyrights: true,
  });

  const { YMapZoomControl } = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1"
  );
  map.addChild(
    new YMapControls({ position: "right" }).addChild(new YMapZoomControl({}))
  );

  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());
  map.addChild(new YMapMarker({ coordinates: [lng, lat] }, markerElement));
}
