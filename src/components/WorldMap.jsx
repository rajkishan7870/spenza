import React, { useEffect, } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { colorData } from "../recoil/atom";
import { useRecoilState } from "recoil";



const WorldMap = () => {

  const [colPerData, setColPerData] = useRecoilState(colorData)


  // useEffect(() => {
  //   fetch("https://s3.ap-south-1.amazonaws.com/hire.isimplexity/data.js")
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  const rawData = [
    { id: 1, region: 'US', data: 290, lat: 39.7837304, lng: -100.445882 },
    { id: 2, region: 'US', data: 490, lat: 39.7837304, lng: -100.445882 },
    { id: 3, region: 'AT', data: 790, lat: 47.59397, lng: 14.12456 },
    { id: 4, region: 'SE', data: 590, lat: 59.6749712, lng: 14.5208584 },
    { id: 5, region: 'AT', data: 290, lat: 47.59397, lng: 14.12456 },
    { id: 6, region: 'SE', data: 390, lat: 59.6749712, lng: 14.5208584 }
  ];

  function mergeDataByRegion(data) {
    const merged = data.reduce((acc, curr) => {
      const existing = acc.find((item) => item.region === curr.region);
  
      if (existing) {
        existing.data += curr.data;
      } else {
        acc.push({ ...curr });
      }
  
      return acc;
    }, []);
  
    return merged;
  }


  const mergedData = mergeDataByRegion(rawData);

  // useEffect(() => {

  //   async function getLatLong(region) {
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${region}`
  //     );
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       const { lat, lon } = data[0];
  //       return { lat: parseFloat(lat), lng: parseFloat(lon) };
  //     } else {
  //       return { lat: 0, lng: 0 };
  //     }
  //   }

  //   async function convertToLatLng(data) {
  //     const promises = data.map(async (item) => {
  //       const latLng = await getLatLong(item.region);
  //       return {
  //         ...item,
  //         lat: latLng.lat,
  //         lng: latLng.lng,
  //       };
  //     });
  //     return Promise.all(promises);
  //   }

  //   convertToLatLng(rawData).then((latLngData) => {
  //     console.log(latLngData)
  //   });

  // }, [])

  const getColorAndPercentage = (data, totalData) => {
    
    const percentage = ((data / totalData) * 100).toFixed(2);
  
    let color;
    if (data > 1000) {
      color = "#1E3A8A";
    } else if (data > 750 && data < 1000) {
      color = "#3B82F6";
    } else if (data > 400 && data < 750) {
      color = "#93C5FD";
    } else {
      color = "#DBEAFE";
    }
  
    return { color, percentage: `${percentage}%` };
  };


const totalData = mergedData.reduce((sum, item) => sum + item.data, 0);


const updatedData = mergedData.map((item) => {
  const { color, percentage } = getColorAndPercentage(item.data, totalData);
  return {
    ...item,
    color,
    percentage,
  };
});

const getColourAndPercentDict = (data)=>{

  const colorPercentages = {};
  data.forEach(item => {
      const color = item.color;
      const percentage = parseFloat(item.percentage);

      if (colorPercentages[color]) {
          colorPercentages[color] += percentage;
      } else {
          colorPercentages[color] = percentage;
      }
  });

  return colorPercentages;

}

useEffect(()=>{

  const colAndPerDict = getColourAndPercentDict(updatedData);

  setColPerData(colAndPerDict);

}, [])

  return (
    <MapContainer
      center={[20, 0]}
      zoom={1.2}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      {updatedData.map((item, index) => (
        <CircleMarker
          key={index}
          center={[item.lat, item.lng]}
          radius={Math.sqrt(Math.sqrt(item.data))}
          color={item.color}
          fillOpacity={0.5}
        >
          <Popup>
            <small>Region:</small> {item.region} <br />
            <small>Usage:</small> {item.data} GB
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
