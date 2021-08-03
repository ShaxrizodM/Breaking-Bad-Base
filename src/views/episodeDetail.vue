<template>
  <div class="wrapper-main py-4">
    <v-card>
      <v-row>
        <v-container class="title-top">
          {{ episode.title }}
        </v-container>
        <v-card-title class="pb-5">Актеры:</v-card-title>
        <v-container fluid>
          <v-row>
            <v-col
              cols="4"
              v-for="(character, index) in episode.characters"
              :key="index"
            >
              <router-link
                class="link-type"
                :to="{
                  name: 'characterDetail',
                  params: { name: character.trim().replace(' ', '+') }
                }"
              >
                {{ character }}
              </router-link>
            </v-col>
          </v-row>
          <v-card> </v-card>
        </v-container>
        <v-card-title class="mt-4">Смерти в этом эпизоде:</v-card-title>
        <v-container fluid>
          <v-row>
            <v-col
              cols="4"
              v-for="(deaths, index) in episode_death"
              :key="index"
            >
              <v-card>
                <v-card-title class="pb-5">
                  {{ deaths.death }}
                </v-card-title>
                <v-card-subtitle class="pt-1">
                  Причина: {{ deaths.cause }}
                </v-card-subtitle>
                <v-card-subtitle class="pt-0">
                  Последние слова: {{ deaths.last_words }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-card> </v-card>
        </v-container>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      episode: {},
      death: [],
      episode_death: []
    };
  },
  mounted() {
    Promise.all([this.getEpidodesId(), this.getDeath()]).then(() => {
      this.deathFilter();
    });
  },
  methods: {
    getEpidodesId() {
      let promAxios = axios
        .get(
          "https://www.breakingbadapi.com/api/episodes/" + this.$route.params.id
        )
        .then(data => {
          this.episode = data.data[0];
        });
      return promAxios;
    },
    getDeath() {
      let promAxios = axios
        .get("https://www.breakingbadapi.com/api/death")
        .then(data => {
          this.death = data.data;
        });
      return promAxios;
    },
    deathFilter() {
      this.episode_death = this.death.filter(death_episode => {
        return death_episode.episode == this.episode.episode;
      });
    }
  }
};
</script>
<style scoped lang="scss">
.wrapper-main {
  max-width: 1200px;
  margin: 0 auto;
  .row {
    margin: 0;
  }
  .title-top {
    text-align: center;
    font-size: 35px;
    font-weight: bold;
  }
  .link-type {
    color: #000;
  }
}
@media all and (max-width: 960px) {
  .row .col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media all and (max-width: 480px) {
  .row .col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
