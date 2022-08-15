<template>
  <div class="state-menu" :class="{ collapsed: collapsed }" title="Сбросить фильтры">
    <div class="state-button" v-on:click.stop="toggleMenu">
      <inline-svg width="18px" :src="require('@/assets/state_menu.svg')" />
      <span class="counter">{{ filters.length }}</span>
    </div>
    <div class="state-popup">

    </div>
  </div>
</template>

<script>
  import AuthUtils from "@/utils/AuthUtils";
  import store from "@/store/store";
  import SessionActions from "@/store/store-session-actions";

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
      filters: function () {
        return this.$store.state.session.filters.filter(item => item.selectedValues.length)
      },
      variables: function () {
        return this.$store.state.session.variables;
      },
    },
    methods: {
      toggleMenu() {
        this.collapsed = !this.collapsed;

        if (this.filters.length) {
          store.dispatch(SessionActions.CLEAR_ALL_FILTERS, [])
          store.dispatch(SessionActions.UPDATE_STATE)
        }
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
    position: relative;
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
  .counter {
    position: absolute;
    font-size: 10px;
    color: #5e688d;
    margin-top: 15px;
    margin-left: 15px;
  }
</style>