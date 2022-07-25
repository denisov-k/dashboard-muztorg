<template>
  <div class="variable">
    <span v-for="(value, index) in values" v-bind:key="index" v-on:click="onValueSelect(index)"
         class="value" :class="index === selectedValueIndex ? 'selected' : '' ">
      {{ value }}
    </span>
  </div>
</template>

<script>
  import store from "@/store/store";
  import SessionActions from "@/store/store-session-actions";

  export default {
    name: "vMerVariable",
    data() {
      return {
        selectedValueIndex: 0
      }
    },
    props: {
      name: {
        type: String,
        required: true
      },
      values: {
        type: Array,
        required: true
      }
    },
    methods: {
      onValueSelect(index) {
        this.selectedValueIndex = index;
      }
    },
    created() {

    },
    watch: {
      selectedValueIndex(index) {
        let value = this.values[index].value,
            payload = { name: this.name, value };

        store.dispatch(SessionActions.SET_VARIABLE, payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .variable {
    padding: 0.35rem 0;
    background-color: #ffffff;
    border-radius: 0.5rem;
    margin: 0.25rem 0.5rem;
    box-sizing: border-box;
    overflow: hidden;

    span {
      font-size: 0.8rem;
      margin: 0;
      padding: 1rem;
      font-weight: 700;
      cursor: pointer;

      &:hover {
      }
      &.selected {
        background-color: #73b1c9;
      }
    }
  }
</style>