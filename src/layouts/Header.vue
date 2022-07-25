<template>
    <div class="header">
      <div>
        <NavigationMenu :collapsed-on-start="!showNavigationMenu"></NavigationMenu>
      </div>
      <div>
        <state></state>
        <logout></logout>
      </div>
    </div>
</template>

<script>
    import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
    import Logout from "@/components/Logout";
    import State from "@/components/State";

    export default {
      name: "Header",
      components: {
        State,
        NavigationMenu,
        Logout
      },
      props: {
        showNavigationMenu: {
          type: Boolean,
          default: false
        },
      },
      computed: {

      },
      methods: {

      },
      mounted() {

      }
    }
</script>

<style scoped lang="scss">
    .header {
      display: flex;
      flex: 0 1 auto;
      padding: 8px 14px;
      justify-content: space-between;
      width: calc(100% - 0px);
      background-color: #2d4b5d08;
      z-index: 10000;
      border-bottom: 1px solid #e7e7e7;
      box-sizing: border-box;

      & > div {
        display: inline-flex;
      }
    }
</style>