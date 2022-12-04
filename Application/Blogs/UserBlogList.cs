using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class UserBlogList
    {
        public class Query : IRequest<Result<PagedList<BlogDto>>> 
        {
            public AppUser AppUser { get; set; }
            public PagingParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BlogDto>>>
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

            public async Task<Result<PagedList<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                request.AppUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var blogQuery = _context.Blogs.OrderByDescending(d => d.Date)
                    .Where(x => x.AppUser == request.AppUser)
                    .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                //var blogsToReturn = _mapper.Map<PagedList<BlogDto>>(blogs);
                return Result<PagedList<BlogDto>>.Success(
                    await PagedList<BlogDto>.CreateAsync(blogQuery, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}