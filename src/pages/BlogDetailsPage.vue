<template>
  <div class="container d-flex flex-column">
    <div class="post border border-dark border-3 mt-4">
      <div class="row">
        <div class="col-6">
          <img :src="blogContent.imgUrl" alt="" class="img-fluid rounded mt-3">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="d-flex justify-content-between mt-3">
            <img :src="profile.picture" alt="" class="img-fluid rounded-circle">
            <div>
              <h4>{{blogContent.title}}</h4>
              <h6>{{profile.name}}</h6>
              <span>{{profile.updatedAt}}</span>
            </div>
            <div>
              <button class="btn btn-warning mt-3">Edit Post</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p class="p-0 mt-2">{{blogContent.body}}</p>
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-warning mt-3">Add Comment</button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { blogsService } from "../services/BlogsService"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup(){
    const route = useRoute()
    onMounted(async () => {
     try {
      //  AppState.searchResults = {} this was causing buggggs
       await blogsService.getByQuery({ _id: route.params.id })
     } catch (error) {
       logger.error(error)
       Pop.toast(error.message, 'error')
     }
    })
    return {
      profile: computed(() => AppState.activeProfile),
      // doing what mick told us not to do because its fun NOTE[epic=Maria]
      blogContent: computed(() => AppState.searchResults[0]),
      getBlogContent(){() => logger.log(blogContent)}
    }
  }
}
</script>


<style lang="scss" scoped>
img{
  max-width: 100%;
}
.row{
  justify-content: center;
}
.post{
  min-height: 60vh;
  max-height: 70vh;
}
</style>