using Application.Core;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Blog Blog { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.FindAsync(request.Blog.Id);

                if (blog == null) return null;

                _mapper.Map(request.Blog, blog);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update blog");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}