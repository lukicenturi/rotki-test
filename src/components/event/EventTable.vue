<template>
  <v-data-table
      :headers="headers"
      :items="events"
  >
    <template v-slot:item.asset="{ item }">
      <v-col class="px-0">
        <v-avatar
            size="36px"
        >
          <img
              alt="Avatar"
              :src="require(`@/assets/assets/${item.asset}.png`)"
          >
        </v-avatar>
        <strong class="ml-4">{{ item.asset }}</strong>
      </v-col>
    </template>
    <template v-slot:item.timestamp="{ item }">
      {{ new Date(item.timestamp * 1000) | date('dd MMMM yyyy')}}
    </template>
    <template v-slot:item.eventType="{ item }">
      <strong class="green--text" v-if="item.eventType === eventType.DEPOSIT">DEPOSIT</strong>
      <strong class="red--text" v-else-if="item.eventType === eventType.WITHDRAW">WITHDRAW</strong>
      <strong v-else>{{ item.eventType.toUpperCase() }}</strong>
    </template>
    <template v-slot:item.amount="{ item }">
      {{ formatBalance(item.amount) }}
    </template>
    <template v-slot:item.price="{ item }">
      ${{ formatBalance(item.price) }}
    </template>
    <template v-slot:item.usdValue="{ item }">
      ${{ formatBalance(item.usdValue) }}
    </template>
  </v-data-table>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { formatBalance } from "@/utils/format-balance";
import EventType from '@/enums/EventType';

export default defineComponent({
  name: 'EventTable',
  props: ['events'],
  data() {
    return {
      eventType: EventType,
      headers: [
        {
          text: 'Asset',
          value: 'asset',
        },
        {
          text: 'Address',
          value: 'address',
        },
        {
          text: 'Transaction Time',
          value: 'timestamp',
        },
        {
          text: 'Type',
          value: 'eventType',
        },
        {
          text: 'Amount',
          value: 'amount',
          align: 'right',
        },
        {
          text: 'Price (USD)',
          value: 'price',
          align: 'right',
        },
        {
          text: 'USD Value',
          value: 'usdValue',
          align: 'right',
        },
      ]
    }
  },
  methods: {
    formatBalance,
  }
})
</script>
