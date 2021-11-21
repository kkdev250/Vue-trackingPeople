const getMovingAngle = (angle) => (Math.floor(Math.random()*30-15) + angle) % 360; 

const getDistance = () => Math.random()/100;

const getPersonLat = (lat, distance, movingAngle) => Math.cos(Math.PI / 180 * movingAngle) * distance + lat;

const getPersonLng = (lng, distance, movingAngle) => Math.sin(Math.PI / 180 * movingAngle) * distance + lng;

module.exports = {
  getMovingAngle,
  getDistance,
  getPersonLat,
  getPersonLng,
};
