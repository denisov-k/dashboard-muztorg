<template>
  <div class="state-menu" :class="{ collapsed: collapsed }">
    <div class="state-button" v-on:click.stop="toggleMenu">
      <inline-svg :src="require('@/assets/navigation/menu.svg')" />
    </div>
    <div class="state-popup">

    </div>
  </div>
</template>

<script>
  import AuthUtils from "@/utils/AuthUtils";

  export default {
    name: "StateMenu",
    components: {

    },
    props: {
      collapsedOnStart:  {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        collapsed: this.collapsedOnStart
      }
    },
    computed: {
      routes: function () {
        return this.$router.options.routes.filter((elem) => elem.meta.visible && this.checkRouteGroups(elem));
      }
    },
    methods: {
      toggleMenu() {
        this.collapsed = !this.collapsed;
      },
      checkRouteGroups(route) {
        if (!route.children.length)
          return AuthUtils.hasGroupsAny(this.$store.state.session.user.groups, route.meta.authGroups);

        route.children = route.children.filter(child => {
          return this.checkRouteGroups(child)
        })

        return !!route.children.length
      },
      changeRoute(selected) {
        this.$router.push({path: selected.path}).catch(err => {});
        this.collapsed = true;
      }
    },
    created: function () {
      window.addEventListener('click', (event) => {
        let path = event.path || (event.composedPath && event.composedPath()),
            isOut = !path.find(item => item.className === 'menu-sidebar');

        if (isOut && !this.collapsed) {
          this.collapsed = true;
        }
      })
    },
    mounted() {
      this.$router.afterEach((to, route) => {
        this.collapsed = true;
      })
    }
  }
</script>

<style scoped>
  .state-button {
    display: inline-flex;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    user-select: none;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin-right: 5px;
  }
  .state-button:hover {
    cursor: pointer;
    background-color: #ececec;
  }
</style>