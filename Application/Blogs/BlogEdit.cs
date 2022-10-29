using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Blog blog = await _context.Blogs.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == request.Blog.Id);

                request.Blog.AppUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                
                if (blog == null) return null;

                _mapper.Map(request.Blog, blog);
                //Initialize photos so they don't cause an error when saving. 
                blog.Photos = new List<Photo>();

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update blog");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}