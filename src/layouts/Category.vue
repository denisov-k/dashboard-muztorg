<template>
  <router-view />
</template>
<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    defaultViewKey: function() {
      return this.$route.name;
    },
    title: function() {
      return this.$route.meta.title
    }
  },
  created: function () {

  },
  mounted() {

  }
}
</script>