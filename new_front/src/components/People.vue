<template>
  <div class="wrapper">
    <h1>People</h1>
    <div class="row">
      <div class="col-xs-12">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr class="info">
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Distance</th>
              <th>Angle</th>
              <th>Distance to base</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td>{{person.name}}</td>
              <td>{{getLat(person)}}</td>
              <td>{{getLng(person)}}</td>
              <td>{{person.distance | km }}</td>
              <td>{{person.movingAngle}}°</td>
              <td>{{distanceTo(getLat(person), getLng(person)) | km}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'People',
    computed: {
      people() {
        return this.$store.state.people;
      }
    },
    methods: {
      getLat(person) {
        return person.latlngs[person.latlngs.length-1].lat.toFixed(12);
      },
      getLng(person) {
        return person.latlngs[person.latlngs.length-1].lng.toFixed(12);
      },
      distanceTo(lat, lng) {
        const point = new google.maps.LatLng(lat, lng);
        const R = 6371e3;
        const base = new google.maps.LatLng(51.11, 17.032);
        const φ1 = base.lat() * Math.PI / 180,  λ1 = base.lng() * Math.PI / 180;
        const φ2 = point.lat() * Math.PI / 180, λ2 = point.lng() * Math.PI / 180;
        const Δφ = φ2 - φ1;
        const Δλ = λ2 - λ1;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2)
              + Math.cos(φ1) * Math.cos(φ2)
              * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const dist = R * c;
        return dist;
      },
    },
    filters: { //rejestracja lokalna filtrów
      km(value) {
        return (value/1000).toFixed(2) + ' km';
      }
    },
  }
</script>

<style scoped>
  .wrapper {
    border: 2px solid black;
    margin: 10px;
    height: 600px;
  }
  .row {
    padding: 5px 0;
  }
  th {
    text-align: center;
  }
</style>
