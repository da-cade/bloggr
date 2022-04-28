<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <img :src="imgUrl" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>
        <img src="" alt="">
        </div>
        <div>
          <h4>Title</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p>Body</p>
      </div>
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
       AppState.searchResults = {}
       await blogsService.getByQuery({ id: route.params.id })
     } catch (error) {
       logger.error(error)
       Pop.toast(error.message, 'error')
     }
    })
    return {
      profile: computed(() => AppState.activeProfile),
      searchResults: computed(() => AppState.searchResults)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>