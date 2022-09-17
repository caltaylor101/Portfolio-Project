using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogCreate
    {
        public class Command : IRequest
        {
            public Blog Blog { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Blogs.Add(request.Blog);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}