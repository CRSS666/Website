L.TileLayer.CRSSLayer = L.TileLayer.extend({
  getTileUrl: function(coordinate) {
    console.log(coordinate);

    const tileX = coordinate.x;
    const tileY = coordinate.y;

    const tileZ = coordinate.z;

    const url = ('https://cdn.theclashfruit.me/crss/map/{z}/{xd}/{yd}/tile.{x}.{y}.png')
      .replace('{yd}', Math.floor(tileY / 10))
      .replace('{xd}', Math.floor(tileX / 10))
      .replace('{y}', tileY)
      .replace('{x}', tileX)
      .replace('{z}', tileZ);

    return url;
  }
});

L.tileLayer.crssLayer = function(templateUrl, options) {
  return new L.TileLayer.CRSSLayer(templateUrl, options);
}

let mapLayer = L.tileLayer.crssLayer('https://cdn.theclashfruit.me/crss/map_new/{xd}/{yd}/tile.{x}.{y}.png', {
  attribution: '&copy; <a href="https://crss.blurryface.xyz/">CRSS</a> players',

  tileSize: 256,

  noWrap: true,

  maxNativeZoom: 0,
  minNativeZoom: -4,

  minZoom: -4,
  maxZoom: -4 + 8,

  zoomOffset: -8
});

let ropMarkers = L.layerGroup([
  L.marker([-75.5, 49.5])
    .bindPopup('Info Centre')
]);

let rorMarkers = L.layerGroup([

]);

let miscMarkers = L.layerGroup([
  L.marker([0.5, 0.5])
    .bindPopup('0; 0'),
  L.marker([1302.5, -661.5])
    .bindPopup('The Dropper'),
]);

let playerMarkers = L.layerGroup([

]);

console.log(L.CRS.Simple.infinite)

let map = L.map('map', {
  layers: [mapLayer, miscMarkers, ropMarkers, rorMarkers, playerMarkers],
  preferCanvas: true,
  crs: L.Util.extend(L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0),
    projection: L.Projection.LonLat
  }),
}).setView([ parseInt(center.split(';')[1]), parseInt(center.split(';')[0])], 2);

let baseMaps = {
  "Overworld": mapLayer
};

let overlayMaps = {
  "Players": playerMarkers,
  "Miscellaneous Markers": miscMarkers,
  "Markers in RoP": ropMarkers,
  "Markers in DRoR": rorMarkers,
};

let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

L.control.mousePosition({
  position: 'bottomright',
  separator: '; ',
  lngFormatter: (x) => {
    return Math.floor(x)
  },
  latFormatter: (y) => {
    return Math.floor(y)
  },
  wrapLng: false,
  lngFirst: true
}).addTo(map);

const mappedPlayers = {}

const updatePlayerPos = (players) =>{
  for (const player of players) {
    const playerMarker = mappedPlayers[player.uniqueId];

    if(playerMarker) {
      playerMarker.setLatLng([player.location.z, player.location.x]);
      playerMarker.setPopupContent(`${player.displayName} (${Math.floor(player.location.x)}; ${Math.floor(player.location.y)}; ${Math.floor(player.location.z)})`);

      mappedPlayers[player.uniqueId] = playerMarker;
    } else {
      const playerIcon = L.icon({
        iconUrl: `https://mc-heads.net/avatar/${player.displayName}`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });


      const marker = L.marker([player.location.z, player.location.x], { icon: playerIcon })
        .bindPopup(`${player.displayName} (${Math.floor(player.location.x)}; ${Math.floor(player.location.y)}; ${Math.floor(player.location.z)})`);

      playerMarkers.addLayer(marker);

      mappedPlayers[player.uniqueId] = marker;
    }
  }

  for (const [uniqueId, playerMarker] of Object.entries(mappedPlayers)) {
    if(!players.find(p => p.uniqueId === uniqueId)) {
      playerMarkers.removeLayer(playerMarker);

      delete mappedPlayers[uniqueId];
    }
  }
}

fetch('https://crss.blurryface.xyz/api/v1/players')
  .then(r => r.json())
  .then(p => {
    updatePlayerPos(p);
  });

setInterval(() => {
  fetch('https://crss.blurryface.xyz/api/v1/players')
    .then(r => r.json())
    .then(p => {
      updatePlayerPos(p);
    });
}, 1000);