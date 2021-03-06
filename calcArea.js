const turf = require('@turf/turf');

exports.calcDistance = function (altitude, velocity) {
  altitude = altitude * 1000.0;
  velocity = (velocity * 5.0) / 18.0;
  return velocity * Math.sqrt(altitude / 4.9);
};

exports.creepyLineMotion = function (poly, len) {
  let shortLen = len, list = [];
  let point = turf.destination(poly[0][1], shortLen, 90);
  let grid = turf.polygon(poly);
  let from = turf.point(poly[0][1]);
  let to = turf.point(poly[0][2]);

  let longLen = turf.distance(from, to) - 2 * shortLen;

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

exports.addProperties = function (rescueTeam, poly) {
  let length = turf.length(poly);
  let time = length / rescueTeam.speed;

  return {
    speed: rescueTeam.speed,
    fieldofview: rescueTeam.fieldofview,
    distance: length,
    time: time
  }
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

  let ?? = Number(distance) / radius; // angular distance in radians
  let ?? = toRadians(Number(direction));

  let ??1 = toRadians(Number(latitude));
  let ??1 = toRadians(Number(longitude));

  let sin??1 = Math.sin(??1),
    cos??1 = Math.cos(??1);
  let sin?? = Math.sin(??),
    cos?? = Math.cos(??);
  let sin?? = Math.sin(??),
    cos?? = Math.cos(??);

  let sin??2 = sin??1 * cos?? + cos??1 * sin?? * cos??;
  let ??2 = Math.asin(sin??2);
  let y = sin?? * sin?? * cos??1;
  let x = cos?? - sin??1 * sin??2;
  let ??2 = ??1 + Math.atan2(y, x);

  return [toDegrees(??2), ((toDegrees(??2) + 540) % 360) - 180]; // normalise to ???180..+180??
};
