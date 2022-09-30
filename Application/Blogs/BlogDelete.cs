using Application.Core;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogDelete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.FindAsync(request.Id);

                // if (blog == null) return null;

                _context.Remove(blog);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the blog");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}