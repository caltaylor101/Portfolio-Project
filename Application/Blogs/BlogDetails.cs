using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogDetails
    {
        public class Query : IRequest<Blog>
        {
            public Guid? Id { get; set; }
            public string UrlSuffix { get; set; }
        }

        public class Handler : IRequestHandler<Query, Blog>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Blog> Handle(Query request, CancellationToken cancellationToken)
            {
                if (request.Id != null)
                {
                    return await _context.Blogs.FindAsync(request.Id);
                }
                return await _context.Blogs.FirstOrDefaultAsync(x => x.UrlSuffix == request.UrlSuffix);
            }
        }
    }
}