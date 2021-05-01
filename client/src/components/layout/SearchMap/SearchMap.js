import './SearchMap.scss';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import airplane_pin from '../../../images/airplane_pin.png';

import L from 'leaflet';
import { connect } from 'react-redux';

import React from 'react';

const mapStateToProps = (state) => {
  return {
    aircraft: state.aircraftReducer,
  };
};

// main componant
const SearchMap = (props) => {
  console.log(props.aircraft);
  console.log(Object.entries(props.aircraft).length !== 0);
  const apitoken =
    'pk.eyJ1IjoibmlraGlsbmFnYXIxMjMiLCJhIjoiY2tvM3l1MGRhMWU5czJ4b2JteWd6NHdoayJ9.ME2Il0_kSq5tr19J6m2UHQ';

  const tileurl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
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
      <TileLayer url={tileurl} />
      {Object.entries(props.aircraft).length !== 0 && (
        <Marker
          icon={L.icon({ iconUrl: airplane_pin, iconSize: 50 })}
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
    </MapContainer>
  );
};

export default connect(mapStateToProps, null)(SearchMap);
