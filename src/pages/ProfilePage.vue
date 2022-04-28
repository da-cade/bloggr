<template>
  <div class="container">
    <!-- This is the profile -->
    <div class="row">
      <div class="col-4">
        <img class="img-fluid rounded-circle m-4" :src="profile.picture">
      </div>
      <div class="col-8 justify-content-center">
        <h2 class="m-3">{{profile.name}}</h2>
        <button class="m-3">Edit</button>
      </div>
      <div class="col-12">
        <button>New Post</button>
      </div>
    </div>
  <!-- Repeat our blog components here -->
    <Blog  v-for="b in blogs" :key="b.id" :blog="b"/>
   </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import Blog from "../components/Blog.vue"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { blogsService } from "../services/BlogsService"
import { profilesService } from "../services/ProfilesService"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {

  components: { Blog },
  setup(){
    const route = useRoute()
    onMounted( async () =>  {
    try {
      await blogsService.getByQuery({ creatorId: route.params.id})
      await profilesService.getProfile(route.params.id)
    } catch (error) {
      logger.error(error)
      Pop.toast(error.message, 'error')
    }
    })
      return {
      account: computed(() => AppState.account),
      blogs: computed(()=> AppState.searchResults),
      profile: computed(()=> AppState.activeProfile)
    }
}
}
</script>


<style lang="scss" scoped>

</style>