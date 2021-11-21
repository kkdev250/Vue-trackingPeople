import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; 
import {rainbowColor} from '@/services/color';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      socket: {
        isConnected: false,
        message: '',
        reconnectError: false,
      },
      dataOnServerReady: false,
      people: [],
      fitMarkers: false,
    },
    mutations: {
      SOCKET_ONOPEN (state, event)  {
        state.socket.isConnected = true;
      },
      SOCKET_ONCLOSE (state, event)  {
        state.socket.isConnected = false;
      },
      SOCKET_ONERROR (state, event)  {
        console.error(state, event);
      },
      SOCKET_ONMESSAGE (state, message)  {
        state.socket.message = message;
        if (message.data == '{"type":"fetch-people"}') {
          state.dataOnServerReady = true;
        }
      },
      SOCKET_RECONNECT(state, count) {
        console.info(state, count);
      },
      SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
      },
      set_dataOnServerReady(state, value) {
        state.dataOnServerReady = value;
      },
      set_people(state, value) {
        value.forEach(person => {
          const statePerson = state.people.find(p => p._id === person._id);
          if (!statePerson) {
            const {lat, lng, ...rest} = person;
            rest.latlngs = [{lat, lng}];
            state.people.push(rest);
          } else {
            statePerson.movingAngle = person.movingAngle;
            statePerson.distance = person.distance;
            statePerson.latlngs.push({
              lat: person.lat,
              lng: person.lng
            });
          }
        });
        state.people.forEach((person, ix) => {
          person.color = rainbowColor(ix/state.people.length);
        });
      },
      set_fitMarkers(state, value) {
        state.fitMarkers = value;
      },
    },
    actions: {
      getPeople: ({ commit }) => {
        axios.get('/all')
            .then(response => {
              //console.log(response);
            })
            .catch(error => console.log(error))
      },
      updatePeople: ({ commit }) => {
        axios.get('/update')
            .then(response => {
              //console.log(response);
              commit('set_people', response.data);
              commit('set_dataOnServerReady', false);
            })
            .catch(error => console.log(error))
      },
    }
});