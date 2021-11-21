<template>
  <div>
    <ul class="nav">
        <router-link to="/map" tag="li" active-class="active" exact><a>MAP</a></router-link>
        <router-link to="/people" tag="li" active-class="active"><a>PEOPLE</a></router-link>
        <router-link to="/configuration" tag="li" active-class="active"><a>CONFIGURATION</a></router-link>
    </ul>  
  </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
  div {
    border: 2px solid black;
    margin: 10px;
    margin-right: 0;
    height: 600px;
  }
  .active {
    background-color: lightgray;
  }
</style>
