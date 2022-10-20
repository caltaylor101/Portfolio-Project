using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Architecture.Security
{
    public class IsAuthorRequirement : IAuthorizationRequirement
    {
        
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsAuthorRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAuthorRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;
            var blogId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());
            var blog = _dbContext.Blogs.Include(x => x.AppUser).Where(x => x.AppUser.Id == userId && x.Id == blogId).FirstOrDefaultAsync().Result;
            if (blog == null) return Task.CompletedTask;

            if (blog.AppUser.Id == userId)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}