
<template>
 <form @submit.prevent="submitBlog()">
   <div class="form-group mt-1">
      <label for="title" class="form-label">Title:</label>
      <input
        type="text"
        id="title"
        class="form-control"
        v-model="editable.title">
    </div>
   <div class="form-group mt-1">
      <label for="imgUrl" class="form-label">Add an image:</label>
      <input
        type="text"
        id="imgUrl"
        class="form-control"
        v-model="editable.imgUrl">
    </div>
    <div class="form-group mt-1">
      <label for="body" class="form-label">Round up that thought:</label>
      <textarea
        type="text"
        class="form-control"
        id="body"
        title="blog-body"
        v-model="editable.body"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-3">Submit</button>
 </form>
</template>



<script>
import { ref } from "@vue/reactivity"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { blogsService } from "../services/BlogsService"
import { Modal } from "bootstrap"
export default {
  setup(){
    const editable = ref({})
    return {
      editable,
      async submitBlog(){
        try {
          await blogsService.createBlog(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById("create-blog-modal")).toggle()
        } catch (error) {
          if(!editable.title){
            Pop.toast("You gotta put somethin' in the form, partner", 'error')
          }
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
  textarea{
    min-height: 20vh;
  } 
</style>