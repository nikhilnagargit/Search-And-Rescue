exports.calcDistance = function (altitude, velocity) {
  return velocity * Math.sqrt(altitude / 4.9);
};

exports.calcSquareJson = function (newLatLon) {
  let latlon1 = [newLatLon[0] + 1, newLatLon[1] + 0.3];
  let latlon2 = [newLatLon[0] + 1, newLatLon[1] - 0.3];
  let latlon3 = [newLatLon[0] - 1, newLatLon[1] - 0.3];
  let latlon4 = [newLatLon[0] - 1, newLatLon[1] + 0.3];
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
    help_points: {
      type: 'FeatureCollection',
      features: [],
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

exports.calcFacilities = function (newLatLon) {
  //call api and get values
};
