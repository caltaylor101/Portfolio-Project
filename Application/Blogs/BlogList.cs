using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogList
    {
        public class Query : IRequest<Result<PagedList<BlogDto>>> 
        { 
            public BlogParams Params { get; set; }
        } 

        public class Handler : IRequestHandler<Query, Result<PagedList<BlogDto>>>
        {
            private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogQuery = (string.IsNullOrEmpty(request.Params.Category)) 
                ? 
                _context.Blogs
                .OrderByDescending(d => d.Date)
                .Include(x => x.AppUser)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .AsQueryable()

                :

                _context.Blogs
                .Where(x => x.Category == request.Params.Category)
                .OrderByDescending(d => d.Date)
                .Include(x => x.AppUser)
                .ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                //var blogsToReturn = _mapper.Map<List<BlogDto>>(blogs);


                return Result<PagedList<BlogDto>>.Success(
                    await PagedList<BlogDto>.CreateAsync(blogQuery, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}