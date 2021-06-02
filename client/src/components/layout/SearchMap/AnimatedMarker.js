import React from 'react';
import drone from '../../../images/drone.png';
import fighter from '../../../images/fighter.png';
import helicopter from '../../../images/helicopter.png';
import {
  GeoJSON,
  LayersControl,
  LayerGroup,
  Polyline,
  useMap,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import Animate from 'leaflet.animatedmarker/src/AnimatedMarker';

const AnimatedMarker = (props) => {
  // use map
  const map = useMap();

  return (
    <LayerGroup>
      {props.filteredGrid.features.map((item, index) => {
        if (item.rescue_team) {
          if (item.spiral === undefined) {
            return (
              <Marker
                key={index}
                icon={L.icon({
                  iconUrl:
                    item.rescue_team === 'helicopterA'
                      ? fighter
                      : item.rescue_team === 'helicopterB'
                      ? helicopter
                      : drone,
                  iconSize: 30,
                })}
                position={[
                  (item.geometry.coordinates[0][0][1] +
                    item.geometry.coordinates[0][2][1]) /
                    2,
                  (item.geometry.coordinates[0][0][0] +
                    item.geometry.coordinates[0][2][0]) /
                    2,
                ]}
              ></Marker>
            );
          } else {
            var line = L.polyline(
              item.spiral.coordinates[0].map((item) => {
                return [item[1], item[0]];
              }),
              {
                color: 'black',
                weight: 0.5,
                dashArray: '4, 3',
                dashOffset: '0',
              }
            );
            var animatedMarker = L.animatedMarker(line.getLatLngs(), {
              autoStart: true,
              icon: L.icon({
                iconUrl:
                  item.rescue_team === 'helicopterA'
                    ? fighter
                    : item.rescue_team === 'helicopterB'
                    ? helicopter
                    : drone,
                iconSize: 30,
              }),
            });
            map.addLayer(animatedMarker);
            map.addLayer(line);
            return '';
          }
        }
        return '';
      })}
    </LayerGroup>
  );
};

export default AnimatedMarker;
