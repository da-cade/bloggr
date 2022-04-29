<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    
      <div>
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex align-items-center">
            <i class="mdi mdi-account-cowboy-hat ms-1"></i>
            <p class="p-0 m-0 ms-2" >Beyond Barbed Wire</p>
          </div>
        </router-link>
      </div>
      <div class="ms-auto d-flex align-items-center">
        <div class="" v-if="account.id">
          <router-link :to="{ name: 'Profile' , params: { id: account.id } }">
            <div class="d-flex" >
              <i class="mdi mdi-account-cowboy-hat-outline"></i>
              <p class="p-0 m-0 mb-1 me-3">My Profile</p>
            </div>
          </router-link>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <!-- LOGIN COMPONENT HERE -->
          <Login />
        </div>
      </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
