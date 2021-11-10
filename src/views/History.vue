<template>
  <div class="home">
    <v-container>
      <div>
        <div>
          <GroupedFilter
              :keyword="keyword"
              :onKeywordChanged="onKeywordChanged"
              :addresses="addresses"
              :selected-addresses="selectedAddresses"
              :set-selected-addresses="setSelectedAddresses"
          />
        </div>
        <div>
          <EventTable :events="mappedEvents" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useStore } from '@/store/utils';
import { MappedEvent } from '@/models/event';
import EventTable from "@/components/event/EventTable.vue";
import GroupedFilter from "@/components/grouped-filter/GroupedFilter.vue";

export default defineComponent({
  name: 'History',
  components: {EventTable, GroupedFilter},
  created() {
    this.fetchAllEvents();
  },
  setup() {
    const store = useStore();

    const mappedEvents = computed(() => {
      return store.getters['events/getMappedEvents'].map((event: MappedEvent) => ({
        asset: event.asset,
        eventType: event.eventType,
        amount: event.value.amount,
        price: event.value.usdValue / event.value.amount,
        usdValue: event.value.usdValue,
        address: event.address,
        timestamp: event.timestamp,
      }));
    });

    const fetchAllEvents = async () => {
      await store.dispatch('events/fetchAllEvents');
    };

    const keyword = computed(() => {
      return store.getters['events/getKeyword'];
    });

    const onKeywordChanged = (newKeyword: string) => {
      store.dispatch('events/filterAsset', {
        keyword: newKeyword
      })
    };

    const addresses = computed(() => {
      return store.getters['events/getAddresses'];
    });

    const selectedAddresses = computed(() => {
      return store.getters['events/getSelectedAddresses'];
    });

    const setSelectedAddresses = (newSelectedAddresses: string[]) => {
      store.dispatch('events/setSelectedAddresses', {
        selectedAddresses: newSelectedAddresses
      } );
    }

    return {
      keyword,
      onKeywordChanged,
      mappedEvents,
      fetchAllEvents,
      addresses,
      selectedAddresses,
      setSelectedAddresses,
    }
  },
});
</script>
