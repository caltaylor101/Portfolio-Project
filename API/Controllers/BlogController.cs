using Application.Blogs;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogController : BaseApiController
    {
        

        [HttpGet]
        public async Task<ActionResult<List<Blog>>> GetBlogs()
        {
            return await Mediator.Send(new BlogList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Blog>> GetBlog(Guid id)
        {
            return await Mediator.Send(new BlogDetails.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlog(Blog blog)
        {
            return Ok(await Mediator.Send(new BlogCreate.Command {Blog = blog}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBlog(Guid id, Blog blog)
        {
            blog.Id = id;
            return Ok(await Mediator.Send(new BlogEdit.Command{Blog = blog}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new BlogDelete.Command{Id=id}));
        }

    }
}