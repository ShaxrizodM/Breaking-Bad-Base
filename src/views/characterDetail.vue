<template>
  <div class="wrapper-main pa-4">
    <v-card class="mx-auto" max-width="420">
      <v-img class="white--text align-end" :src="character.img" height="500px">
      </v-img>
      <v-card-title>
        {{ character.name }}
      </v-card-title>
      <v-card-actions>
        <v-btn color="orange lighten-2" text> Explore </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            День рождение: {{ character.birthday }} <br />
            Прозвище: {{ character.nickname }} <br />
            Статус: {{ character.status }} <br />
            Профессии : <br />
            <v-card-subtitle
              v-for="(occupations, chIndex) in character.occupation"
              :key="chIndex"
              class="pt-1 pb-1 pl-0"
            >
              {{ chIndex + 1 }} - {{ occupations }}
            </v-card-subtitle>
            Изображен: {{ character.portrayed }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      character: {}
    };
  },
  mounted() {
    this.getCharacterDetail();
  },
  methods: {
    getCharacterDetail() {
      axios
        .get(
          "https://www.breakingbadapi.com/api/characters?name=" +
            this.$route.params.name
        )
        .then(data => {
          this.character = data.data[0];
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
    font-size: 35px;
    font-weight: bold;
  }
}
</style>
