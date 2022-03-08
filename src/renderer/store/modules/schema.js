import db from "electron-db";
import path from "path";
const local = path.join(__dirname, "db");

const state = {
  schemas: {},
};

const mutations = {
  SET_STATE(state, data) {
    state.schemas = data;
    console.log(data);
  },
};

const actions = {
  getSchemas({ commit }) {
    db.getAll("schemas", local, (status, data) => {
      commit("SET_STATE", data);
    });
  },
  addSchemas({ commit }) {
    commit("Sth");
  },
};

export default {
  state,
  mutations,
  actions,
};
