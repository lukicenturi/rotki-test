<template>
  <v-row justify="space-between" align="center">
    <v-col cols="4">
      <v-text-field
          placeholder="Search Asset"
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
          class="mx-2"
          fab
          depressed
      >
        <v-icon>
          mdi-filter
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'GroupedFilter',
  })
</script>