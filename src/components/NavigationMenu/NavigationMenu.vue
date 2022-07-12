<template>
  <div class="navigation-menu" :class="{ collapsed: collapsed }">
    <div class="menu-button" v-on:click.stop="toggleMenu">
      <inline-svg :src="require('@/assets/navigation/menu.svg')" />
    </div>
    <div class="menu-sidebar">
      <navigation-list :routes="routes"></navigation-list>
    </div>
  </div>
</template>

<script>
import NavigationList from './NavigationList';
import AuthUtils from "@/utils/AuthUtils";

export default {
  name: "NavigationMenu",
  components: {
    NavigationList
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
.navigation-menu {
  position: relative;
}
.menu-button {
  position: absolute;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  z-index: 10001;
  cursor: pointer;
  user-select: none;
  background-color: white;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.menu-sidebar {
  display: -webkit-box;
  box-sizing: border-box;
  overflow: auto;
  width: 350px;
  height: 100%;
  padding: 80px 0;
  position: fixed;
  left: 0;
  top: 0;
  background: #131313;
  z-index: 10;
  transition: visibility 0s, opacity 0.1s linear;
  visibility: visible;
  opacity: 1;
  /* -webkit-box-align: center; */
}

.navigation-menu.collapsed .menu-sidebar {
  visibility: hidden;
  opacity: 0;
}
.menu-sidebar::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

.menu-sidebar::-webkit-scrollbar
{
  width: 7px;
  height: 9px;
  background-color: #F5F5F5;
}

.menu-sidebar::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #747474;
}
</style>