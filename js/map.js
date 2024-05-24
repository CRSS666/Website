L.TileLayer.CRSSLayer = L.TileLayer.extend({
  getTileUrl: function(coordinate) {
    const tileX = coordinate.x;
    const tileY = coordinate.y;

    const tileZ = coordinate.z;

    const url = ('https://cdn-new.theclashfruit.me/crss/tiles/zoom.{z}/{xd}/{yd}/tile.{x}.{y}.png')
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

let mapLayer = L.tileLayer.crssLayer('https://cdn-new.theclashfruit.me/crss/tiles/zoom.{z}/{xd}/{yd}/tile.{x}.{y}.png', {
  attribution: '&copy; <a href="https://crss.blurryface.xyz/">CRSS</a> Players | Tiles With <a href="https://unmined.net/">uNmINeD</a>.',

  tileSize: 256,

  noWrap: true,

  maxNativeZoom: 0,
  minNativeZoom: -4,

  minZoom: -4,
  maxZoom: -4 + 8,

  zoomOffset: -8
});

let ropMarkers = L.layerGroup([]);

let drrMarkers = L.layerGroup([]);

let miscMarkers = L.layerGroup([]);

markers.forEach(marker => {
  const coords = marker.data.split(';');

  switch (marker.category) {
    case 'rop':
      ropMarkers
        .addLayer(
          L.marker([
            parseFloat(coords[0]), parseFloat(coords[1])
          ]).bindPopup(marker.name)
        );
      break;
    case 'drr':
      drrMarkers.addLayer(
        L.marker([
          parseFloat(coords[0]), parseFloat(coords[1])
        ]).bindPopup(marker.name)
      );
      break;
    default:
      miscMarkers.addLayer(
        L.marker([
          parseFloat(coords[0]), parseFloat(coords[1])
        ]).bindPopup(marker.name)
      );
      break;
  }
});

let playerMarkers = L.layerGroup([

]);

console.log(L.CRS.Simple.infinite)

let map = L.map('map', {
  layers: [ 
    mapLayer,

    miscMarkers,

    ropMarkers,
    drrMarkers,
    
    playerMarkers
  ],
  preferCanvas: true,
  crs: L.Util.extend(L.CRS.Simple, {
    transformation: new L.Transformation(1, 0, 1, 0),
    projection: L.Projection.LonLat
  }),
}).setView([ 
  parseFloat(center.split(';')[1]),
  parseFloat(center.split(';')[0]) 
], 2);

let baseMaps = {
  "Overworld": mapLayer
};

let overlayMaps = {
  "Players": playerMarkers,
  "Miscellaneous Markers": miscMarkers,
  "Markers in RoP": ropMarkers,
  "Markers in DRR": drrMarkers,
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
        iconUrl: `https://mc-heads.net/avatar/${player.displayName}/16`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14]
      });

      const marker = L.marker([player.location.z, player.location.x], { icon: playerIcon, alt: player.displayName })
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