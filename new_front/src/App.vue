<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-xs-12"> 
        <app-header/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 menu"> 
        <app-menu/>
      </div>
      <div class="col-xs-10"> 
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Menu from '@/components/Menu';
export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-menu': Menu,
  },
  mounted() {
    this.$store.dispatch('getPeople');
  },
  computed: {
    dataIsReady() {
      return this.$store.state.dataOnServerReady;
    }
  },
  watch: {
    dataIsReady(newValue) {
      if (newValue === true) {
        this.$store.dispatch('updatePeople');
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .menu {
  padding-right: 0;
}
</style>
