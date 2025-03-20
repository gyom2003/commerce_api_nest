
<template>
    <div class="text-center">
        <div clas="col-sm-12">
            <h4 style="margin-top: 30px;"><small><button class="btn btn-success" @click="navigate()">View all the blogs instances </button></small></h4>
            <hr>
            <h2>{{ posts.title }}</h2>
            <h5><span class="glyphicon glyphicon-time"></span> Post by {{ posts.author }}, {{ posts.date_posted }}. </h5>
            <p>{{ posts.body }}</p>
        </div>
    </div>
</template>

<script>
import router from "../router/index";
import axios from 'axios';

export default {
    name: 'PostBlogComponent', 

    data() {
        return {
            id: 0,
            posts: {}
        }
    },

    created() {
        this.id = this.$route.params.id
        this.getPosts()
        //data load before rendering
    },
    methods: {
        getPosts() {
            axios
                .get(`http://localhost:4000/blog/blog/${this.id}`)
                .then(data => {
                    console.log("data blog post => ", data)
                    this.posts = data.data
                })
        },
        navigate() {
            router.go(-1)
        }
    }
}

</script>