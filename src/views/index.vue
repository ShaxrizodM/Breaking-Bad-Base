<template>
  <div class="wrapper-main py-4 px-2">
    <v-card>
      <v-tabs
        v-if="episodes.length"
        v-model="tab"
        color="deep-purple accent-4"
        right
        @change="seasonChange"
      >
        <v-tab v-for="(season, key) in seasons" :key="key">
          {{ key }}
        </v-tab>
        <v-tab-item v-for="(season, key) in seasons" :key="key + 'qweqwre'">
          <v-container class="mt-5" fluid>
            <v-row>
              <v-col cols="4" v-for="(episode, index) in season" :key="index">
                <v-card elevation="2" class="pa-3 d-flex">
                  <v-card-title>
                    №{{ episode.episode }} - {{ episode.title }}
                  </v-card-title>
                  <v-card-text>
                    <div class="d-flex align-center">
                      <b>Дата выхода</b>: {{ episode.air_date }}
                    </div>
                    <v-divider />
                    <v-card-subtitle class="mt-4 pl-0">Актеры:</v-card-subtitle>
                    <div v-if="episode.characters && episode.characters.length">
                      <v-list>
                        <v-list-item
                          v-for="(character, chIndex) in episode.characters"
                          :key="chIndex"
                        >
                          <v-list-item-title>
                            - {{ character }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-card-text>
                  <router-link
                    class="link-type"
                    :to="{
                      name: 'episodeDetail',
                      params: { id: episode.episode_id }
                    }"
                  >
                    <v-btn>Подробнее</v-btn>
                  </router-link>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      tab: 0,
      episodes: [],
      seasons: {}
    };
  },
  mounted() {
    this.getAllEpisodes();
  },
  methods: {
    getAllEpisodes() {
      axios.get("https://www.breakingbadapi.com/api/episodes").then(data => {
        this.episodes = data.data;
        this.filterEpisodes();
      });
    },
    filterEpisodes() {
      this.episodes.forEach(episode => {
        const season = episode.season.replace(" ", "");
        if (!this.seasons[season]) {
          this.seasons[season] = [];
        }
        this.seasons[season].push(episode);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper-main {
  max-width: 1200px;
  margin: 0 auto;
}
.v-sheet.v-card {
  flex-direction: column;
  height: 100%;
  a.link-type {
    text-decoration: none;
    margin-top: auto;
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
