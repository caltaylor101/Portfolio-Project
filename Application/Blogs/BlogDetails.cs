using Application.Core;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogDetails
    {
        public class Query : IRequest<Result<MyBlogsDto>>
        {
            public Guid? Id { get; set; }
            public string UrlSuffix { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MyBlogsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<MyBlogsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Id != null)
                {
                    var blog = await _context.Blogs.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == request.Id);
                    var blogToReturn = _mapper.Map<MyBlogsDto>(blog);
                    return Result<MyBlogsDto>.Success(blogToReturn);
                }
                var urlBlog = await _context.Blogs.FindAsync(request.Id);
                    var urlBlogToReturn = _mapper.Map<MyBlogsDto>(urlBlog);
                return Result<MyBlogsDto>.Success(urlBlogToReturn);

            }
        }
    }
}