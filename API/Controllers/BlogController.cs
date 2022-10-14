using Application.Blogs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogController : BaseApiController
    {
        

        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            return HandleResult(await Mediator.Send(new BlogList.Query()));
        }

        [HttpGet("{urlSuffix}/{id}")]
        public async Task<IActionResult> GetBlog(string urlSuffix, Guid? id)
        {
            var result = await Mediator.Send(new BlogDetails.Query{UrlSuffix = urlSuffix, Id = id});

            return HandleResult(result);
        }

        [HttpGet("{urlSuffix}")]
        public async Task<ActionResult<Blog>> GetBlog(string urlSuffix)
        {
            var result =  await Mediator.Send(new BlogDetails.Query{UrlSuffix = urlSuffix});
            
            return HandleResult(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBlog(Blog blog)
        {
            return HandleResult(await Mediator.Send(new BlogCreate.Command {Blog = blog}));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditBlog(Guid id, Blog blog)
        {
            blog.Id = id;
            return HandleResult(await Mediator.Send(new BlogEdit.Command{Blog = blog}));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new BlogDelete.Command{Id=id}));
        }

        [HttpGet("UserBlogs")]
        public async Task<IActionResult> GetUserBlogs(Guid? appUserId)
        {
            var result =  await Mediator.Send(new UserBlogList.Query());
            
            return HandleResult(result);
        }

    }
}