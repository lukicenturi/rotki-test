<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-list
          nav
          dense
      >
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-wallet</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Balances</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/history">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title>History</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-avatar :tile="true" class="ml-2" :size="32">
        <img :src="require('@/assets/logo.png')" alt="logo">
      </v-avatar>

      <v-toolbar-title class="ml-5">Rotki Test</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data() {
    return {
      drawer: false,
    }
  }
});
</script>
