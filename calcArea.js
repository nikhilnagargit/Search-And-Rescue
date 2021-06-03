const turf = require('@turf/turf');

exports.calcDistance = function (altitude, velocity) {
  altitude = altitude * 1000.0;
  velocity = (velocity * 5.0) / 18.0;
  return velocity * Math.sqrt(altitude / 4.9);
};

exports.creepyLineMotion = function (poly, len) {
  let shortLen = len, list = [];
  let point = turf.point(poly[0][1]);
  let grid = turf.polygon(poly);
  let from = turf.point(poly[0][1]);
  let to = turf.point(poly[0][2]);

  let longLen = turf.distance(from, to);

  let dest = point;
  while (turf.booleanPointInPolygon(dest.geometry.coordinates, grid)) {

    //1
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, shortLen, 180);
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    //2
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, longLen, 90);
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    //3
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, shortLen, 180);
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    //4
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, longLen, -90);

  }

  return {
    type: 'Polygon',
    coordinates: [list]
  };
}

exports.spiralMotion = function (poly, len) {
  let distance = len, list = [];
  let grid = turf.polygon(poly);
  let point = turf.centroid(grid);

  let dest = point;
  while (turf.booleanPointInPolygon(dest.geometry.coordinates, grid)) {

    //1
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 0); // 0 degree for North
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    //2
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 90); // 90 degree for East
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    distance += len;
    //3
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, 180); // 180 degree for South
    if (!turf.booleanPointInPolygon(dest.geometry.coordinates, grid))
      break;

    //4
    point = turf.point(dest.geometry.coordinates);
    list.push(point.geometry.coordinates);
    dest = turf.destination(point, distance, -90); // -90 degree for West

    distance += len;
  }

  return {
    type: 'Polygon',
    coordinates: [list]
  };
}

exports.calcSquareJson = function (newLatLon, side, direction, cellSide) {
  side = side / 100.0;

  let latlon1 = [newLatLon[0] + side, newLatLon[1] + side / 2];
  let latlon2 = [newLatLon[0] + side, newLatLon[1] - side / 2];
  let latlon3 = [newLatLon[0] - side, newLatLon[1] - side / 2];
  let latlon4 = [newLatLon[0] - side, newLatLon[1] + side / 2];

  let poly = turf.polygon([
    [
      [latlon1[1], latlon1[0]],
      [latlon2[1], latlon2[0]],
      [latlon3[1], latlon3[0]],
      [latlon4[1], latlon4[0]],
      [latlon1[1], latlon1[0]],
    ],
  ]);
  let options = { pivot: [newLatLon[1], newLatLon[0]] };
  let rotatedPoly = turf.transformRotate(poly, direction, options);
  let area = turf.area(poly) / 1000000;

  const { coordinates } = rotatedPoly.geometry;

  // let bbox = [coordinates[0][0][1], coordinates[0][2][0], coordinates[0][2][1], coordinates[0][0][0]];  // [minX, minY, maxX, maxY]

  var features = turf.featureCollection([
    turf.point(coordinates[0][0], { name: 'A' }),
    turf.point(coordinates[0][1], { name: 'B' }),
    turf.point(coordinates[0][2], { name: 'C' }),
    turf.point(coordinates[0][3], { name: 'D' }),
  ]);

  // let list = spiralMotion(newLatLon, 1);
  // console.log(list);

  var bigRec = turf.envelope(features);

  let squareGrid = turf.squareGrid(bigRec.bbox, cellSide);

  let filteredGrid = {
    type: 'FeatureCollection',
    features: [],
  };
  filteredGrid.features = squareGrid.features.filter((obj) => {
    let poly2 = turf.polygon(obj.geometry.coordinates);
    let centroid = turf.centroid(poly2);

    return turf.booleanPointInPolygon(centroid, rotatedPoly);
  });

  return {
    geojson: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: Math.random(),
          center: [newLatLon[0].toPrecision(8), newLatLon[1].toPrecision(8)],

          properties: {
            type: 'land',
            area: area.toFixed(2) + ' sq km',
            shape: 'rectangle',
            description: 'this area is very dangerous.',
            crashPoint:
              newLatLon[0].toPrecision(8) + ' , ' + newLatLon[1].toPrecision(8),
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
    filteredGrid,
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
