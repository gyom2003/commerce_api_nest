import { Injectable } from '@nestjs/common';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>
    ) {}

    async getBlogs(): Promise<Blog[]> {
        return this.blogModel.find().exec()
    }

    async getBlog(id: string): Promise<BlogDocument | null> {
        const getblog = await this.blogModel
            .findById(id)
            .exec()
        return getblog
    }

    async createBlog(createBlogDto: CreateBlogDto): Promise<BlogDocument | null> {
        const createBlogRef = new this.blogModel(createBlogDto)
        return createBlogRef.save()
    }

    async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<BlogDocument | null > {
        const updateblog = await this.blogModel
            .findByIdAndUpdate(id, updateBlogDto, {new: true})
            .exec()
        return updateblog
    }

    async removeBlog(id: string): Promise<BlogDocument | null> {
        const deleteblog = await this.blogModel
            .findByIdAndDelete(id)
            .exec()
        return deleteblog
    }
}