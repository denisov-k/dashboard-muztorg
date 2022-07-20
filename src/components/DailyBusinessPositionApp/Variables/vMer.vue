<template>
  <div class="variables">
    <span v-for="(value, index) in variable.values" v-bind:key="index" v-on:click="onValueSelect(value, index)"
         class="variable" :class="index === selectedValueIndex ? 'selected' : '' ">
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
        variable: { name: 'vMer', values: ['GS_Руб', 'Количество'] },
        selectedValueIndex: 0
      }
    },
    methods: {
      onValueSelect(value, index) {
        let payload = { name: this.variable.name, value };

        store.dispatch(SessionActions.SET_VARIABLE, payload).then(() => {
          this.selectedValueIndex = index;
        })
      }
    },
    created() {

    }
  }
</script>

<style lang="scss" scoped>
  .variables {
    padding: 1rem 1rem 0;

    span {
      font-size: 0.8rem;
      margin: 0 0.5rem;
      font-weight: 700;
      cursor: pointer;
      text-underline-offset: 3px;

      &:hover {
        text-decoration-line: underline;
        text-decoration-style: dashed;
      }
      &.selected {
        text-decoration-line: underline;
        text-decoration-style: solid;
      }
    }
  }
</style>