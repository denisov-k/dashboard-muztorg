<template>
  <div class="filter" :class="[disabled ? 'disabled' : '']">
    <multiselect v-model="selectedValues" track-by="qElemNumber" :options="values"
                 :placeholder="placeholder" :customLabel="customLabel"
                 @input="onValueSelect" :multiple="true" :close-on-select="false"
                 :limit="3">
      <slot name="noOptions">Список пуст</slot>
      <slot name="noOptions">Ничего не найдено</slot>
    </multiselect>
  </div>
</template>

<script>
  import api from "@/services/api";
  import multiselect from "vue-multiselect";
  import store from "@/store/store";
  import SessionActions from "@/store/store-session-actions";

  export default {
    name: "qFilter",
    components: {
      multiselect
    },
    data() {
      return {
        disabled: true,
        values: [],
        selectedValues: []
      }
    },
    props: {
      appId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      placeholder: String
    },
    mounted() {
      this.getValuesList().then(values => {
        this.values = values;

        this.selectedValues = this.$store.getters.selectedFilterValues(this.name);

        this.disabled = false;
      })

      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'clearAllFilters')
          this.selectedValues = [];
      });
    },
    destroyed() {
      this.unsubscribe()
    },
    methods: {
      customLabel(item) {
        return item.qText
      },
      getValuesList() {
        return api.request('apps/filter', { name: this.name, appId: this.appId })
            .then(rsp => rsp.data.map(item => item[0]));
      },
      onValueSelect(value) {
        let payload = { name: this.name, values: this.selectedValues };

        store.dispatch(SessionActions.SET_FILTER, payload)
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
  .filter {
    display: inline-flex;
    padding: 0.25rem 0.5rem;
    font-size: 12px;
    box-sizing: border-box;
    max-width: 100%;

    &.disabled {
      pointer-events: none;
    }

    .multiselect {
      font-size: 12px;

      .multiselect__tags {
        .multiselect__tags-wrap {
          .multiselect__tag {
            background: #a0b6d9;

            .multiselect__tag-icon:hover {
              background: #00000024;
            }
          }
        }
      }
      .multiselect__select {
        line-height: 14px;
      }
    }
  }
</style>