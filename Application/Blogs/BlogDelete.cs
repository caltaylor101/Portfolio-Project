using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogDelete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                Blog blog = await _context.Blogs.FindAsync(request.Id);

                _context.Remove(blog);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}