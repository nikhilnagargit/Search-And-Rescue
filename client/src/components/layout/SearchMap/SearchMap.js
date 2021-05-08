import './SearchMap.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import airplane_pin from '../../../images/airplane_pin.png';
import {
  GeoJSON,
  Circle,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  Rectangle,
} from 'react-leaflet';

import hospital_pin from '../../../images/hospital_pin.png';
import station_pin from '../../../images/station_pin.png';
import L from 'leaflet';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    aircraft: state.aircraftReducer,
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
      <LayersControl position='topright'>
        {/* set the base layer option 1 */}
        <LayersControl.BaseLayer checked name='  Streets View'>
          <TileLayer url={tileurl_option1} />
        </LayersControl.BaseLayer>

        {/* set the base layer option 2*/}
        <LayersControl.BaseLayer name=' Satellite View'>
          <TileLayer url={tileurl_option2} />
        </LayersControl.BaseLayer>

        {/* layer, which shows search area */}

        <LayersControl.Overlay name='Search Area Layer' checked>
          <GeoJSON key={1} data={props.areaData.geojson} />
        </LayersControl.Overlay>

        {/* aircraft and its popup layer */}
        <LayersControl.Overlay name='Aircraft LKP' checked>
          <LayerGroup>
            {Object.entries(props.aircraft).length !== 0 && (
              <Marker
                icon={L.icon({ iconUrl: airplane_pin, iconSize: 40 })}
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
            {Object.entries(props.areaData).length !== 0 && (
              <>
                {props.areaData.help_points.features.map((item, index) => {
                  return (
                    <Marker
                      key={index}
                      icon={L.icon({
                        iconUrl: getImageFromPoint(item.properties.type),
                        iconSize: 30,
                      })}
                      position={[
                        item.geometry.coordinates[1],
                        item.geometry.coordinates[0],
                      ]}
                    >
                      <Popup>
                        <b>{item.properties.type}</b>
                        <br />

                        {item.properties.title}
                      </Popup>
                    </Marker>
                  );
                })}
              </>
            )}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default connect(mapStateToProps, null)(SearchMap);