<template>
  <div class="navigation-list">
    <div class="navigation-item" v-for="(item, index) in menuItems" :key="index"
         :class="{ selected: item.name === routeValue.name }" :title="item.meta.title" v-on:click.self="onItemClick(item, $event)">

      <div class="expand-items" v-if="item.children.length">
        <inline-svg class="icon" :src="require('@/assets/navigation/expand.svg')"  v-if="!item.showChildren" />
        <inline-svg class="icon" :src="require('@/assets/navigation/collapse.svg')" v-else />
      </div>

      <router-link class="navigation-link" :to="{ path: item.path }">
        <span v-on:click.self="onItemClick(item, $event)">{{ item.meta.title }}</span>
      </router-link>

      <div class="sub-items-list" v-if="item.showChildren">
        <navigation-list :routes="item.children" :depth="depth + 1"></navigation-list>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationList",
  components: {
  },
  data() {
    return {

    }
  },
  computed: {
    routeValue: function () {
      return this.$route;
    },
    menuItems() {
      return this.routes.map(item => {
        return {...item, showChildren: this.isRouteSelected(item)}
      });
    }
  },
  props: {
    routes: {
      type: Array,
      default: () => []
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onItemClick(item, event) {
      //console.log(item, !!item.children.length)
      if (item.children.length)
        this.toggleChildren(item);
    },
    toggleMenu() {
      this.onItemClick();
    },
    toggleChildren(item) {
      item.showChildren = !item.showChildren;
      this.$forceUpdate();
    },
    isRouteSelected(route) {
      if (route.name === this.$route.name)
        return true;

      if (route.children.length)
        return route.children.some(item => this.isRouteSelected(item));
    }
  },
  mounted() {

    //console.log(this.menuItems);
  },
  created() {

  }
}
</script>

<style scoped>
.navigation-list {
  font-size: 14px;
  align-self: center;
  padding: 0 14px;
  height: fit-content;
}
.sub-items-list {
  margin-top: 5px;
}
.sub-items-list .navigation-list {
  padding-right: 0;
  padding-left: 25px;
}
.navigation-item {
  text-align: left;
  padding: 7px 0px;
}
.navigation-link {
  color: #ffffff;
  /*font-weight: 600;*/
  text-decoration: unset;
}
.navigation-link:hover {
  color: #92d4ff;
}
.navigation-item.selected > .navigation-link {
  color: #b2c4ff;
}
.expand-items {
  display: inline-block;
  cursor: pointer;
  margin: 0 5px 0 0;
}
.expand-items .icon {
  fill: white;
  height: 13px;
  width: 13px;
}
</style>