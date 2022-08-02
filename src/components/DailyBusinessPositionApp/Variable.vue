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
        if (this.selectedValueIndex === index)
          return;

        this.selectedValueIndex = index;

        let value = this.values[index],
            payload = { name: this.name, value };

        store.dispatch(SessionActions.SET_VARIABLE, payload)
        store.dispatch(SessionActions.UPDATE_STATE)
      }
    },
    mounted() {
      let selectedValue = this.$store.getters.selectedVariableValue(this.name),
          index = this.values.findIndex(item => item === selectedValue) || 0;

      this.selectedValueIndex = index > 0 ? index : 0;
    }
  }
</script>

<style lang="scss" scoped>
  .variable {
    /*white-space: nowrap;*/
    padding: 0.35rem 0;
    background-color: #ffffff;
    border-radius: 0.5rem;
    margin: 0.25rem 0.5rem;
    box-sizing: border-box;
    overflow: hidden;

    span {
      display: inline-block;
      font-size: 0.8rem;
      margin: 0;
      padding: 0 0.4rem;
      cursor: pointer;
      line-height: 25px;

      &:hover {
      }
      &.selected {
        font-weight: 700;
      }
    }
  }
</style>