<template>
  <div>

    <div class="text-center">
      <h1>Blogs Page</h1>
      <p>See all of your blogs, you can delete view them or also edit :3</p>

      <div v-if="posts.length == 0">
        <p>Pas de blog trouvé veuillez en créer</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="post in posts" :key="post._id">
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
              <h2 class="card-img-top">{{ post.title }}</h2>
            <p class="card-text">{{ post.body }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link :to="{name: 'Post', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">View Post </router-link>
                  <router-link :to="{name: 'Edit', params: {id: post._id}}" class="btn btn-sm btn-outline-secondary">Edit Post </router-link>
                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deletePost(post._id)">Delete Post</button>
              </div>
            </div>

            <div class="card-footer">
              <small class="text-muted">Posted on: {{ post.date_posted}}</small><br/>
              <small class="text-muted">by: {{ post.author}}</small>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeComponent',

  data() {
    return {
      posts: []
    }
  },

  created() {
    this.fetchAllPosts()
  },

  methods: {

    fetchAllPosts() {
      axios
        .get(`http://localhost:4000/blog/blogs`)
        .then(data => this.posts = data.data)
    }, 

    deletePost(id) {
      axios.delete(`http://localhost:4000/blog/delete?blogID=${id}`)
      .then(data => {
        console.log("data delete blog =>", data)
        window.location.reload()
      })
    }
  }
}
</script>

