import React, { useEffect, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Modify, Snap } from 'ol/interaction';
import { Style, Fill, Stroke } from 'ol/style';

const MapView = ({ name }) => {
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [modifyInteraction, setModifyInteraction] = useState(null);

  useEffect(() => {
    const initialVectorSource = new VectorSource();
    const initialVectorLayer = new VectorLayer({
      source: initialVectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
      }),
    });

    const initialMap = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        initialVectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });

    const initialDrawInteraction = new Draw({
      source: initialVectorSource,
      type: 'Polygon',
    });
    initialMap.addInteraction(initialDrawInteraction);

    const initialModifyInteraction = new Modify({ source: initialVectorSource });
    initialMap.addInteraction(initialModifyInteraction);

    const snapInteraction = new Snap({ source: initialVectorSource });
    initialMap.addInteraction(snapInteraction);

    setMap(initialMap);
    setVectorSource(initialVectorSource);
    setDrawInteraction(initialDrawInteraction);
    setModifyInteraction(initialModifyInteraction);

    return () => initialMap.setTarget(null);
  }, []);

  const handleDraw = () => {
    if (drawInteraction) {
      drawInteraction.setActive(true);
      modifyInteraction.setActive(false); // Disable modify while drawing
    }
  };

  const handleEdit = () => {
    if (modifyInteraction) {
      modifyInteraction.setActive(true);
      drawInteraction.setActive(false); // Disable draw while editing
    }
  };

  const handleDeleteAll = () => {
    if (vectorSource) {
      vectorSource.clear();
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{name}</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
      <div style={{ textAlign: 'center', marginTop: '10px' }} className='p-2'>
      <button onClick={handleDraw} 
        className=" bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2">
        Draw
        </button>
        <button onClick={handleEdit} 
        className=" bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2">
        Edit
        </button>
        <button onClick={handleDeleteAll} 
        className=" bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2">
        Delete All Polygons
        </button>
      </div>
    </div>
  );
};

export default MapView;