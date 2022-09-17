using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;

namespace Application.Blogs
{
    public class BlogEdit
    {
        public class Command : IRequest
        {
            public Blog Blog { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.FindAsync(request.Blog.Id);

                _mapper.Map(request.Blog, blog);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}