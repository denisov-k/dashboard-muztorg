<template>
    <div class="header">
      <NavigationMenu :collapsed-on-start="!showNavigationMenu"></NavigationMenu>
      <logout></logout>
    </div>
</template>

<script>
    import NavigationMenu from "@/components/NavigationMenu/NavigationMenu";
    import Logout from "@/components/Logout";

    export default {
      name: "Header",
      components: {
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

<style scoped>
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
    }
    li.menu-item {
      display: inline-block;
      background-color: #f4f8fb;
      padding: 5px 12px;
      border-radius: 7px;
      margin: 2px 5px;
      border: 1px solid #dadada;
    }
    li.menu-item:hover {
        background-color: #e4e4e4;
    }
    .menu-item a {
        color: #313131;
        text-decoration: none;
    }
    .title {
        font-weight: 600;
        margin: 15px 0px;
    }
    .menu {
      padding-inline-start: 0;
    }
</style>