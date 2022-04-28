
<template>
  <div class="row">
    <div class="col-12">
        <div class="d-flex border border-dark border-3 rounded p-3 mt-3 selectable" @click.stop="goToProfile()">
          <div class="p-2">
            <h2>{{blog.name}}</h2>
            <h5>{{blog.title}}</h5>
            <p class="overflow">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita fugit ullam facilis blanditiis nostrum doloremque optio commodi est deserunt consequatur repudiandae ea aliquam, consectetur, quasi consequuntur beatae. Iusto, earum eos.</p>
            <button class="btn btn-secondary" v-if="route.params.id == blog.creatorId" @click.stop="goToDetails()">BUTTON!</button>
          </div>
          <div>
            <img class="img-fluid rounded" :src="blog.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute, useRouter } from "vue-router"

export default {
  props: {
    blog: {
      type: Object,
      required: true
    },
  },
  setup(props){
    const route = useRoute()
    const router = useRouter()
    return {
      goToProfile(){
        router.push({ name: 'Profile', params: { id: props.blog.creatorId } })
      },
      goToDetails(){
        router.push({ name: 'BlogDetailsPage', params: { id: props.blog.id } })
      },
      account: computed(() => AppState.account),
      route
    }
  }
}
</script>


<style lang="scss" scoped>

</style>