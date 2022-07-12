<template>
  <div class="logout-button" v-on:click="logout" :title="`Выйти из аккаунта ${username}`"></div>

</template>

<script>
    export default {
      name: "Logout",
      computed: {
        username() {
          return this.$store.state.session.user.username
        }
      },
      methods: {
        logout() {
          window.location.href = '/auth/logout';
        }
      }
    }
</script>

<style scoped>
  .logout-button {
    display: inline-flex;
    border: 1px solid #c3c3c3;
    border-radius: 5px;
    user-select: none;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjQ5NC4yMzlweCIgaGVpZ2h0PSI0OTQuMjM4cHgiIHZpZXdCb3g9IjAgMCA0OTQuMjM5IDQ5NC4yMzgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5NC4yMzkgNDk0LjIzODsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTE5OS43MjUsMHYzNi4wMjVIODUuMjExdjQyMS42NmwxMTQuNTE0LDAuMDk0djM2LjQ1OWwyMDkuMDg1LTM3LjU1NWwwLjIxNi00MTguODY3TDE5OS43MjUsMHogTTIzNC40MDQsMjMwLjU3NA0KCQljNy4wMjIsMCwxMi43MTUsNy40MDgsMTIuNzE1LDE2LjU0NWMwLDkuMTM5LTUuNjkyLDE2LjU0NS0xMi43MTUsMTYuNTQ1cy0xMi43MTUtNy40MDYtMTIuNzE1LTE2LjU0NQ0KCQlDMjIxLjY4OCwyMzcuOTgyLDIyNy4zODIsMjMwLjU3NCwyMzQuNDA0LDIzMC41NzR6IE0xMTkuMjExLDQyMy43MTNWNzAuMDI1aDgwLjUxNHYzNTMuNzUzTDExOS4yMTEsNDIzLjcxM3oiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K);
    width: 35px;
    height: 35px;
    background-size: 55%;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }
  .logout-button:hover {
    cursor: pointer;
    background-color: #ececec;
  }
</style>