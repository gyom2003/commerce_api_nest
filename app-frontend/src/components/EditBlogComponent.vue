<template>
    <div>
          <h4 class="text-center mt-20">
           <small>
             <button class="btn btn-success" v-on:click="navigate()"> View All Blogs </button>
           </small>
        </h4>
            <div class="col-md-12 form-wrapper">
              <h2> Edit Blog </h2>
              <form id="edit-post-form" @submit.prevent="editBlog">
                <div class="form-group col-md-12">
                    <label for="title"> Title </label>
                    <input type="text" id="title" v-model="blog.title" name="title" class="form-control" placeholder="Enter title">
                </div>
                <div class="form-group col-md-12">
                    <label for="description"> Description </label>
                    <input type="text" id="description" v-model="blog.description" name="description" class="form-control" placeholder="Enter Description">
                </div>
                <div class="form-group col-md-12">
                    <label for="body"> Write Content </label>
                    <textarea id="body" cols="30" rows="5" v-model="blog.body" class="form-control"></textarea>
                </div>
                <div class="form-group col-md-12">
                    <label for="author"> Author </label>
                    <input type="text" id="author" v-model="blog.author" name="author" class="form-control">
                </div>
    
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" type="submit"> Edit Blog </button>
                </div>
              </form>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import router from "../router/index";


export default {
    name: 'EditBlogComponent',

    data() {
        return {
            id: 0,
            blog: {}
        }
    },

    created() {
        this.id = this.$route.params.id
        this.getBlog()
    },

    methods: {
        editBlog() {
            let blogData = {
                title: this.blog.title,
                description: this.blog.description,
                body: this.blog.body,
                author: this.blog.author,
                date_posted: this.blog.date_posted
            }
            axios.put(`http://localhost:4000/blog/edit?blogID=${this.id}`, blogData)
                .then(data => {
                    //data.data ?
                    console.log("data edit blog", data)
                    router.push({ name: "home" })
                })
        },


        getBLog() {
            axios
                .get(`http://localhost:4000/blog/blog/${this.id}`)
                .then(data => {this.blog = data.data})
        },
        navigate() {
            router.go(-1)
        }
    }
}
</script>