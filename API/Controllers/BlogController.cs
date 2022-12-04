using Application.Blogs;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetBlogs([FromQuery]BlogParams param)
        {
            return HandlePagedResult(await Mediator.Send(new BlogList.Query{Params = param}));
        }

        [HttpGet("UserBlogs")] 
        public async Task<IActionResult> GetUserBlogs([FromQuery]BlogParams param)
        {
            
            return HandlePagedResult(await Mediator.Send(new UserBlogList.Query{Params = param}));
        }

        [HttpGet("{urlSuffix}/{id}")]
        public async Task<IActionResult> GetBlog(string urlSuffix, Guid? id)
        {
            var result = await Mediator.Send(new BlogDetails.Query { UrlSuffix = urlSuffix, Id = id });

            return HandleResult(result);
        }

        [HttpGet("{urlSuffix}")]
        public async Task<IActionResult> GetBlog(string urlSuffix)
        {
            var result = await Mediator.Send(new BlogDetails.Query { UrlSuffix = urlSuffix });

            return HandleResult(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBlog(Blog blog)
        {
            return HandleResult(await Mediator.Send(new BlogCreate.Command { Blog = blog }));
        }

        [Authorize(Policy = "IsBlogAuthor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBlog(Guid id, Blog blog)
        {
            blog.Id = id;
            return HandleResult(await Mediator.Send(new BlogEdit.Command { Blog = blog }));
        }

        [Authorize(Policy = "IsBlogAuthor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(Guid id)
        {
            
            return HandleResult(await Mediator.Send(new BlogDelete.Command { Id = id }));
        }

        

    }
}