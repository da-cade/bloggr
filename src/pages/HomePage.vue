<template>
  <div class="container">
    <Blog  v-for="b in blogs" :key="b.id" :blog="b" />
    <!-- blog item -->
    
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { blogsService } from "../services/BlogsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup(){
    onMounted(async () => {
      try {
        await blogsService.getAllBlogs()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return{
      blogs: computed(() => AppState.blogs)
    }
  }
}

</script>

<style scoped lang="scss">
img{
  max-height: 300px;
}
</style>
