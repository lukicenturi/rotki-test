<template>
  <v-row justify="space-between" align="center">
    <v-col cols="4">
      <v-text-field
          :value="keyword"
          placeholder="Search Asset"
          @input="onKeywordChanged"
          :clearable="true"
      />
    </v-col>
    <v-col cols="auto">
      <v-menu offset-y left :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              class="mx-2"
              depressed
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>
              mdi-filter
            </v-icon>
            Filter Account Address
          </v-btn>
        </template>
        <v-list shaped>
          <v-list-item-group
              :value="selectedAddresses"
              multiple
              @change="setSelectedAddresses"
          >
            <template v-for="(item, i) in addresses">
              <v-divider
                  v-if="!item"
                  :key="`divider-${i}`"
              ></v-divider>

              <v-list-item
                  v-else
                  :key="`item-${i}`"
                  :value="item"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-checkbox :input-value="active"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script lang="ts">
  import { defineComponent } from '@vue/composition-api';

  export default defineComponent({
    name: 'GroupedFilter',
    props: {
      keyword: {
        type: String,
        default: '',
      },
      onKeywordChanged: {
        type: Function,
        default: null,
      },
      addresses: {
        type: Array,
        default: [],
      },
      selectedAddresses: {
        type: Array,
        default: [],
      },
      setSelectedAddresses: {
        type: Function,
        default: null,
      }
    },
  })
</script>
