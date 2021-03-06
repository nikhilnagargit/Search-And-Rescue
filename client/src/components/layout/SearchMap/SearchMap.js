import './SearchMap.scss';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import airplane_pin from '../../../images/airplane_pin.png';
import default_pin from '../../../images/default_pin.png';
import { GeoJSON, LayersControl, LayerGroup, Polyline } from 'react-leaflet';

import hospital_pin from '../../../images/hospital_pin.png';
import station_pin from '../../../images/station_pin.png';
import centerpointicon from '../../../images/rec.png';

import L from 'leaflet';
import { connect } from 'react-redux';
import AnimatedMarker from './AnimatedMarker';

const mapStateToProps = (state) => {
  return {
    aircraft: state.aircraftReducer,
    areaData: state.searchAreaReducer,
    help_points_geojson: state.helpPointsReducer,
    roads_geojson: state.roadsReducer,
  };
};

// main componant
const SearchMap = (props) => {
  // fetch data for search area

  // render the corresponding image from assets
  const getImageFromPoint = (type) => {
    if (type === 'hospital') {
      return hospital_pin;
    } else if (type === 'station') {
      return station_pin;
    } else {
      return default_pin;
    }
  };

  const apitoken =
    'pk.eyJ1IjoibmlraGlsbmFnYXIxMjMiLCJhIjoiY2tvM3l1MGRhMWU5czJ4b2JteWd6NHdoayJ9.ME2Il0_kSq5tr19J6m2UHQ';

  const tileurl_option1 = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
  const tileurl_option2 = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
  return (
    <MapContainer
      className='mysearchmap'
      style={{ height: '100%', width: '100%' }}
      center={
        Object.entries(props.aircraft).length === 0
          ? [26.9124, 75.7873]
          : [props.aircraft.latitude, props.aircraft.longitude]
      }
      zoom={12}
    >
      {/* to access the map by useMap hook, we can access map directly and use it as normal leaflet map */}
      {/* <InteractWithMap></InteractWithMap> */}

      <LayersControl position='topright'>
        {/* set the base layer option 1 */}
        <LayersControl.BaseLayer checked name=' Streets View'>
          <TileLayer url={tileurl_option1} />
        </LayersControl.BaseLayer>

        {/* set the base layer option 2*/}
        <LayersControl.BaseLayer name=' Satellite View'>
          <TileLayer url={tileurl_option2} />
        </LayersControl.BaseLayer>

        {/* layer, which shows grid and icons of rescue teams */}

        <LayersControl.Overlay name='Grid' checked>
          <LayerGroup>
            {props.areaData.filteredGrid.features.map((item, index) => {
              return (
                <GeoJSON
                  data={item}
                  style={{ weight: 0.6, fillOpacity: 0.1 }}
                  key={index}
                />
              );
            })}
          </LayerGroup>
          <AnimatedMarker
            filteredGrid={props.areaData.filteredGrid}
          ></AnimatedMarker>
        </LayersControl.Overlay>

        {/* <LayersControl.Overlay name='Grid' checked>
          {props.areaData.filteredGrid.features.map((item) => {
            console.log(item.geometry.coordinates);
            return (
              <Polygon
                positions={item.geometry.coordinates[0].map((item) => {
                  return [item[1], item[0]];
                })}
              />
            );
          })}
        </LayersControl.Overlay> */}

        <LayersControl.Overlay name='Search Area Layer' checked>
          <LayerGroup>
            <GeoJSON
              data={props.areaData.geojson}
              style={{
                fillColor: 'orange',
                fillOpacity: 0.1,
                color: 'purple',
                weight: 1,
              }}
            />
            {props.areaData.geojson.features[0].center ? (
              <LayerGroup>
                <Marker
                  key={props.areaData.geojson.features[0].id}
                  icon={L.icon({
                    iconUrl: centerpointicon,
                    iconSize: 25,
                  })}
                  position={props.areaData.geojson.features[0].center}
                >
                  <Popup key={props.areaData.geojson.features[0].id + 'popup'}>
                    Center -{' '}
                    {props.areaData.geojson.features[0].properties.crashPoint}
                  </Popup>
                </Marker>

                <Polyline
                  pathOptions={{
                    color: 'grey',
                    dashArray: '4, 10',
                    dashOffset: '0',
                  }}
                  positions={[
                    [props.aircraft.latitude, props.aircraft.longitude],
                    props.areaData.geojson.features[0].center,
                  ]}
                />
              </LayerGroup>
            ) : (
              ''
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        {/* aircraft and its popup layer */}
        <LayersControl.Overlay name='Aircraft LKP' checked>
          <LayerGroup>
            {Object.entries(props.aircraft).length !== 0 && (
              <Marker
                icon={L.icon({
                  iconUrl: airplane_pin,
                  iconSize: 35,
                })}
                position={[props.aircraft.latitude, props.aircraft.longitude]}
              >
                <Popup>
                  <h3>Last known Information of Aircraft</h3>
                  Title: <b>{props.aircraft.title}</b>
                  <br />
                  Location:
                  <b>
                    {props.aircraft.latitude},{props.aircraft.longitude}
                  </b>
                  <br />
                  Category : {props.aircraft.category}
                  <br />
                  Direction :{props.aircraft.direction}
                  <br />
                  Velocity :{props.aircraft.velocity}
                  <br />
                  Altitude :{props.aircraft.altitude}
                  <br />
                  Direction :{props.aircraft.direction}
                  <br />
                  Weather :{props.aircraft.weather}
                  <br />
                  Description :{props.aircraft.description}
                </Popup>
              </Marker>
            )}
          </LayerGroup>
        </LayersControl.Overlay>

        {/* layers, which shows additionl points like hospitals, bases etc */}
        <LayersControl.Overlay checked name='Additional Spots Layer'>
          <LayerGroup>
            {props.help_points_geojson.features.length !== 0 && (
              <>
                {props.help_points_geojson.features.map((item, index) => {
                  return (
                    <Marker
                      key={item.id}
                      icon={L.icon({
                        iconUrl: getImageFromPoint(item.properties.amenity),
                        iconSize: 30,
                      })}
                      position={[
                        item.geometry.coordinates[1],
                        item.geometry.coordinates[0],
                      ]}
                    >
                      <Popup key={item.id + 'popup'}>
                        {Object.entries(item.properties).map((entry, i) => {
                          return (
                            <span key={entry[0] + item.id}>
                              {entry[0]}:{entry[1]}
                              <br />
                            </span>
                          );
                        })}
                      </Popup>
                    </Marker>
                  );
                })}
              </>
            )}
          </LayerGroup>
        </LayersControl.Overlay>
        {/* layers, which shows additionl shapes of geography like roads or rivers */}
        <LayersControl.Overlay checked name='Roads or Rivers'>
          <LayerGroup>
            <GeoJSON
              key={props.roads_geojson.features.length}
              data={props.roads_geojson}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default connect(mapStateToProps, null)(SearchMap);
