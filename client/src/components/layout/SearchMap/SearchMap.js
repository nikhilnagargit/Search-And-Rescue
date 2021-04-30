import './SearchMap.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import React from 'react';

const SearchMap = (props) => {
  const apitoken =
    'pk.eyJ1IjoibmlraGlsbmFnYXIxMjMiLCJhIjoiY2tvM3l1MGRhMWU5czJ4b2JteWd6NHdoayJ9.ME2Il0_kSq5tr19J6m2UHQ';

  const tileurl = `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=${apitoken}`;
  return (
    <MapContainer
      className='mysearchmap'
      style={{ height: '100%', width: '100%' }}
      center={[51.505, -0.09]}
      zoom={12}
    >
      <TileLayer url={tileurl} />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SearchMap;
