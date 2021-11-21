<template>
  <div class="wrapper">
    <app-map name="test" :coordsArr="people" :fitMarkers="fitMarkers"></app-map>
    <!--<app-map name="test" :coordsArr="test_coords"></app-map>
    <button @click="test_add">Dodaj punkt</button>
    <button @click="test_coords=[]">Usuń wszystkie</button>-->
  </div>
</template>

<script>
import TrackingMap from '@/components/TrackingMap';
export default {
  name: 'HelloWorld',
  components: {
    'app-map': TrackingMap
  },
  data () {
    return {
      test_coords: [
        {
          lat: 51.501527,
          lng: -0.1921837,
          movingAngle: 0,
          _id: 1,
        }, 
        {
          lat: 51.505874,
          lng: -0.1838486,
          movingAngle: -90,
          _id: 2,
        }, 
        {
          lat: 51.4998973,
          lng: -0.202432,
          movingAngle: 90,
          _id: 3,
        },
      ],
    }
  },
  methods: {
    test_add() {
      //this.test_coords.push({lat: 51.481527, lng: -0.1921837, movingAngle: 180, _id: 4});
      this.test_coords = this.test_coords.concat({lat: 51.481527, lng: -0.1921837, movingAngle: 180, _id: 4}); //concat, not push! - to trigger the watch in TrackingMap.vue
    },
  },
  computed: {
    people() {
      return this.$store.state.people;
    },
    fitMarkers() {
      return this.$store.state.fitMarkers;
    }
  }
}
</script>

<style scoped>
  .wrapper {
    border: 2px solid black;
    margin: 10px;
    height: 600px;
  }
</style>
