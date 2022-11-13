using Application.Core;
using Application.Photos;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
            private readonly IMediator _mediator;
            public Handler(DataContext context, IMediator mediator)
            {
                _mediator = mediator;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == request.Id);

                // if (blog == null) return null;
                foreach (var photo in blog.Photos)
                {
                    System.Console.WriteLine("test");
                    System.Console.WriteLine("test");
                    System.Console.WriteLine(photo.Id);

                    await _mediator.Send(new DeletePhoto.Command{Id = photo.Id});
                }

                _context.Remove(blog);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the blog");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}