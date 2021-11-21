<template>
  <div class="wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <h1>Configuration</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <h2 class="text-left">Map options:</h2>
        </div>
      </div>
      <div class="row hcenter">
        <div class="col-xs-2">
          <check-slider v-model="fitMarkers" />
        </div>
        <div class="col-xs-10 text-left">
          <h3>Scale map to fit all markers</h3>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  import CheckSlider from '@/components/CheckSlider';
  export default {
    name: 'Configuration',
    components: {
      CheckSlider,
    },
    computed: {
      fitMarkers: {
        get() {
          return this.$store.state.fitMarkers;
        },
        set(value) {
          this.$store.commit('set_fitMarkers', value);
        }
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
  h3 {
    margin: 0;
  }
  .hcenter {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>
