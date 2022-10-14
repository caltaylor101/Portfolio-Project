using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class UserBlogList
    {
        public class Query : IRequest<Result<List<BlogDto>>> 
        {
            public AppUser AppUser { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<BlogDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<List<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                    var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                    request.AppUser = user;
                var blogs = await _context.Blogs.Where(x => x.AppUser == request.AppUser).ToListAsync();
                var blogsToReturn = _mapper.Map<List<BlogDto>>(blogs);
                return Result<List<BlogDto>>.Success(blogsToReturn);
            }
        }
    }
}