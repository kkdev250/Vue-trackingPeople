<template>
  <div class="google-map" :id="mapName"></div>
</template>

<script>
export default {
  name: 'TrackingMap',
  props: ['name', 'coordsArr', 'fitMarkers'],
  data () {
    return {
      mapName: this.name + '-map',
      map: null,
      bounds: null,
      markers: [],
      infowindow: null,
      defaultCenter: new google.maps.LatLng(51.108037, 17.038169),
      defaultZoom: 14,
    }
  },

  methods: {
    removeMarkersFromMap() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });
        this.markers=[];
        this.bounds = new google.maps.LatLngBounds();
      }
    },
    moveMarkers() {
      if (this.markers.length > 0 && this.coordsArr.length > 0) {
        this.coordsArr.forEach((coord) => {
          const marker = this.markers.find(x => x.id === coord._id);
          const position =new google.maps.LatLng(coord.latlngs[coord.latlngs.length-1]);
          marker.setPosition(position);
          marker.setIcon({
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: coord.color,
            fillOpacity: 0.8,
            strokeWeight: 2,
            rotation: coord.movingAngle
          });
          if (this.fitMarkers) {
            this.map.fitBounds(this.bounds.extend(position));
          }
          const path = marker.track.getPath();
          path.push(position);
        });
      }
    },
    addMarkersToMap() {
      if (this.coordsArr.length > 0) {
        this.coordsArr.forEach((coord) => {
          const position = new google.maps.LatLng(coord.latlngs[coord.latlngs.length-1]);
          const marker = new google.maps.Marker({ 
            position,
            map: this.map,
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              scale: 6,
              fillColor: "red",
              fillOpacity: 0.8,
              strokeWeight: 2,
              rotation: coord.movingAngle
            },  
            name: coord.name,
            id: coord._id,
          });
          const track = new google.maps.Polyline({
            path: coord.latlngs,
            strokeColor: coord.color,
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          track.setMap(this.map);
          marker.track = track;
          marker.addListener('click', () => {
            this.infowindow.setContent(marker.name);
            this.infowindow.open(this.map, marker);
          });
          this.markers.push(marker);
          this.map.fitBounds(this.bounds.extend(position));
        });
        if (this.coordsArr.length == 1) {
          this.map.setZoom(this.defaultZoom);
          const coord = this.coordsArr[0];
          this.map.setCenter(coord.latlngs[coord.latlngs.length-1]);
        }
      } else {
        this.map.setCenter(this.defaultCenter);
        this.map.setZoom(this.defaultZoom);
      }      
    }
  },

  watch: {
    coordsArr: {
      handler(newValue) {
        if (newValue.length > this.markers.length) {
          this.removeMarkersFromMap();
          this.addMarkersToMap();
        } else if (newValue.length === 0) {
          this.removeMarkersFromMap();
        } else {
          this.moveMarkers();
        }
      },
      deep: true,
    }
  },
  
  mounted () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName);
    this.map = new google.maps.Map(element);

    this.infowindow = new google.maps.InfoWindow();
    this.map.addListener('click', () => {
      this.infowindow.close();
    });
    this.addMarkersToMap(this.coordsArr);
  }
}
</script>

<style scoped>
  .google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: gray;
  }
</style>
