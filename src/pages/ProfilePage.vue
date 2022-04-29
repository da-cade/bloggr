<template>
  <div class="container">
    <!-- This is the profile -->
    <div class="row">
      <div class="col-4 d-flex justify-content-center">
        <img class="img-fluid rounded-circle m-4" :src="profile.picture">
      </div>
      <div class="col-8 profile-info d-flex flex-column justify-content-center">
        <h2 class="">Username: {{profile.name}}</h2>
        <div v-if="account.id === route.params.id">
          <h6>{{ account.email }}</h6>
          <h6>{{ account.createdAt }}</h6>
        </div>
        <div class="d-flex">
          <i class="mdi mdi-pencil bg-warning rounded selectable p-2" v-if="account.id === route.params.id"></i>
        </div>
        <h6>{{account.bio}}</h6>
      </div>
      <div class="col-4">
        <button class="btn btn-warning ms-5 mt-3" v-if="account.id === route.params.id" data-bs-toggle="modal" data-bs-target="#new-post-modal">New Post</button>
      </div>
    </div>
  <!-- Repeat our blog components here -->
    <Blog  v-for="b in blogs" :key="b.id" :blog="b"/>
   </div>

  <Modal id="new-post-modal">
    <template #modal-title-slot>
      <h3>Create a Blog</h3>
    </template>
    <template #modal-body-slot>
      <BlogForm />
    </template>
  </Modal>

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
      profile: computed(()=> AppState.activeProfile),
      route
    }
}
}
</script>


<style lang="scss" scoped>
.profile-info{
  min-height: 30vh;    
}
img{
  min-height: 15vh
}
</style>