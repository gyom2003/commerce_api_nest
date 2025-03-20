import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus, NotFoundException, Query} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Response } from 'express';
import { Res }  from '@nestjs/common';
import { ValidateBlogIdPipe } from './shared/pipes/custom-blog-pipes';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get('blogs')
    async getBlogs(@Res() res: Response) {
        const blogs = await this.blogService.getBlogs()
        return res.status(HttpStatus.OK).json(blogs)
    }

    @Get('blog/:blogID')
    async getBlog(@Res() res, @Param('blogID', new ValidateBlogIdPipe()) blogID) {
        const blog = await this.blogService.getBlog(blogID)
        if (!blog) throw new NotFoundException("blog doesn't exist in the db !")
        return res.status(HttpStatus.OK).json(blog)
    }

    @Post('/blog')
    async addBlog(@Body() createBlogDto: CreateBlogDto) {
        return this.blogService.createBlog(createBlogDto)
    }

    @Put('/edit')
    async editBLog(
        @Res() res,
        @Query('blogID', new ValidateBlogIdPipe()) blogID,
        @Body() CreateBlogDto :CreateBlogDto
    ) {
        const editedBlog = await this.blogService.updateBlog(blogID, CreateBlogDto)
        if (!editedBlog) throw new NotFoundException('Blog does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'your blog has been updated !',
            blog: editedBlog
        })
    }

    @Delete('/delete')
    async deletePost(
        @Res() res, 
        @Query('blogID', new ValidateBlogIdPipe()) blogID
    ) {
        const deletedPost = await this.blogService.removeBlog(blogID);
        if (!deletedPost) throw new NotFoundException('Blog does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Blog has been deleted!',
            post: deletedPost
        })
    }
}