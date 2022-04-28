import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class BlogsService {
  async getAllBlogs(){
    const res = await api.get('api/blogs')
    // console.log(res.data)
    AppState.blogs = res.data
  }
  async getByQuery(params){
    const res = await api.get('api/blogs', {params})
    console.log(res.data)
    AppState.searchResults = res.data
  }
}

export const blogsService = new BlogsService();