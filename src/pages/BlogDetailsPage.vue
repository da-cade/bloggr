<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- this is not a thing, it's only ever the coverImg of the account who created it... -->
        <img :src="blogContent.imgUrl" alt="">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div>
          <img :src="profile.coverImg" alt="" class="img-fluid">
        </div>
        <div>
          <h4>{{blogContent.title}}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p>{{blogContent.body}}</p>
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
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup(){
    const route = useRoute()
    onMounted(async () => {
     try {
       AppState.searchResults = {}
       await blogsService.getByQuery({ _id: route.params.id })
     } catch (error) {
       logger.error(error)
       Pop.toast(error.message, 'error')
     }
    })
    return {
      profile: computed(() => AppState.activeProfile),
      // doing what mick told us not to do because its fun NOTE[epic=Maria]
      blogContent: computed(() => AppState.searchResults[0])
    }
  }
}
</script>


<style lang="scss" scoped>

</style>