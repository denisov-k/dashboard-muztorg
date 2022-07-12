<template>
  <div class="page-content"></div>
</template>

<script>

    import AuthUtils from "@/utils/AuthUtils";

    export default {
      name: "Home",
      mounted() {
        // this.changeRoute(this.getFirstAvailableRoute());
      },
      methods: {
        getFirstAvailableRoute() {
          return this.$router.options.routes.filter((elem) => elem.meta.visible && this.checkRouteGroups(elem))[0];
        },
        checkRouteGroups(route) {
          return AuthUtils.hasGroupsAll(this.$store.state.session.user.groups, route.meta.authGroups);
        },
        changeRoute(selected) {
          this.$router.push({path: selected.path});
        }
      }
    }
</script>

<style scoped>

</style>