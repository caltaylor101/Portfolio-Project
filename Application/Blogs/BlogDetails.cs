using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogDetails
    {
        public class Query : IRequest<Blog>
        {
            public Guid Id { get; set; }
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
                return await _context.Blogs.FindAsync(request.Id);
            }
        }
    }
}