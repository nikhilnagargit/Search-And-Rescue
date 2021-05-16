const turf = require('@turf/turf');

exports.calcDistance = function (altitude, velocity) {
  altitude = altitude * 1000.0;
  velocity = (velocity * 5.0) / 18.0;
  return velocity * Math.sqrt(altitude / 4.9);
};

exports.calcSquareJson = function (newLatLon, side, direction) {
  side = side / 100.0;
  let latlon1 = [newLatLon[0] + side, newLatLon[1] + side / 2];
  let latlon2 = [newLatLon[0] + side, newLatLon[1] - side / 2];
  let latlon3 = [newLatLon[0] - side, newLatLon[1] - side / 2];
  let latlon4 = [newLatLon[0] - side, newLatLon[1] + side / 2];

  let poly = turf.polygon([[[latlon1[1], latlon1[0]],
  [latlon2[1], latlon2[0]],
  [latlon3[1], latlon3[0]],
  [latlon4[1], latlon4[0]],
  [latlon1[1], latlon1[0]]]]);
  let options = { pivot: [newLatLon[1], newLatLon[0]] };
  let rotatedPoly = turf.transformRotate(poly, direction, options);
  let area = turf.area(poly) / 1000000;

  const { coordinates } = rotatedPoly.geometry;

  return {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            type: 'land',
            area: area.toFixed(2) + ' sq km',
            shape: 'rectangle',
            description: 'this area is very dangerous.',
            crashPoint: newLatLon
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [coordinates[0][0][0], coordinates[0][0][1]],
                [coordinates[0][1][0], coordinates[0][1][1]],
                [coordinates[0][2][0], coordinates[0][2][1]],
                [coordinates[0][3][0], coordinates[0][3][1]],
                [coordinates[0][4][0], coordinates[0][4][1]],
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
