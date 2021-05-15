exports.calcDistance = function (altitude, velocity) {
  altitude = altitude * 1000.0;
  velocity = (velocity * 5.0) / 18.0;
  return velocity * Math.sqrt(altitude / 4.9);
};

function translate(lat, lon, direction, newLatLon) {
  direction = range(direction);
  let newLat = lat * Math.cos(direction) - lon * Math.sin(direction);
  let newLon = lat * Math.sin(direction) + lon * Math.cos(direction);
  return [newLat + newLatLon[0], newLon + newLatLon[1]];
}

function range(d) {
  if ((d >= 337 && d <= 360) || (d >= 0 && d <= 22) || (d >= 157 && d <= 202))
    return 0;
  if ((d >= 22 && d <= 45) || (d >= 202 && d <= 225)) return 10;
  if ((d >= 45 && d <= 67) || (d >= 225 && d <= 247)) return 20;
  if ((d >= 67 && d <= 112) || (d >= 247 && d <= 292)) return 30;
  if ((d >= 112 && d <= 135) || (d >= 292 && d <= 315)) return 40;
  return 50;
}

exports.calcSquareJson = function (newLatLon, side, direction) {
  side = side / 100.0;
  let latlon1 = translate(side, side / 2, direction, newLatLon);
  let latlon2 = translate(side, -side / 2, direction, newLatLon);
  let latlon3 = translate(-side, -side / 2, direction, newLatLon);
  let latlon4 = translate(-side, side / 2, direction, newLatLon);
  return {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            type: 'land',
            area: '14785.2 square km',
            shape: 'rectangle',
            description: 'this area is very dangerous.',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [latlon1[1], latlon1[0]],
                [latlon2[1], latlon2[0]],
                [latlon3[1], latlon3[0]],
                [latlon4[1], latlon4[0]],
                [latlon1[1], latlon1[0]],
              ],
            ],
          },
        },
      ],
    },
  };
};

exports.calcLatLon = function (latitude, longitude, direction, distance) {
  let radius = 6371e3; // (Mean) radius of earth

  let toRadians = function (v) {
    return (v * Math.PI) / 180;
  };
  let toDegrees = function (v) {
    return (v * 180) / Math.PI;
  };

  let δ = Number(distance) / radius; // angular distance in radians
  let θ = toRadians(Number(direction));

  let φ1 = toRadians(Number(latitude));
  let λ1 = toRadians(Number(longitude));

  let sinφ1 = Math.sin(φ1),
    cosφ1 = Math.cos(φ1);
  let sinδ = Math.sin(δ),
    cosδ = Math.cos(δ);
  let sinθ = Math.sin(θ),
    cosθ = Math.cos(θ);

  let sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
  let φ2 = Math.asin(sinφ2);
  let y = sinθ * sinδ * cosφ1;
  let x = cosδ - sinφ1 * sinφ2;
  let λ2 = λ1 + Math.atan2(y, x);

  return [toDegrees(φ2), ((toDegrees(λ2) + 540) % 360) - 180]; // normalise to −180..+180°
};
