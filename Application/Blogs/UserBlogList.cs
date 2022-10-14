using Application.Core;
using Application.Interfaces;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class UserBlogList
    {
        public class Query : IRequest<Result<List<Blog>>> 
        {
            public AppUser AppUser { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<Blog>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<Blog>>> Handle(Query request, CancellationToken cancellationToken)
            {
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                    request.AppUser = user;
                Console.WriteLine(user.Id);
                var blogs = await _context.Blogs.Where(x => x.AuthorId == request.AppUser.Id).ToListAsync();
                return Result<List<Blog>>.Success(blogs);
            }
        }
    }
}