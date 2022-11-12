using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogCreate
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Blog Blog { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private int suffixExtender = 1;
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                request.Blog.AppUser = user;
                //Create the UrlSuffix from the Title of the blog
                request.Blog.UrlSuffix = RemoveWhitespace(request.Blog.Title);
                //Get the current blog
                Blog currentBlog = await _context.Blogs.FirstOrDefaultAsync(x => x.UrlSuffix == request.Blog.UrlSuffix);

                foreach (var image in request.Blog.Photos)
                {
                    Console.WriteLine(image);
                    var photo = await _context.Photos.FirstOrDefaultAsync(x => x.Url == image.Url);
                    photo.Blog = request.Blog;
                    photo.Order = image.Order;
                }
                request.Blog.Photos = null;

                //Rename the URL until a name that isn't taken is available. 
                while (currentBlog != null && !String.IsNullOrEmpty(currentBlog.UrlSuffix))
                {
                    //Arbitrary addition for the number.
                    //This makes '&-' unavailable in the title.
                    request.Blog.UrlSuffix = request.Blog.UrlSuffix.Split("&-")[0];
                    request.Blog.UrlSuffix += "&-" + suffixExtender.ToString();
                    currentBlog = await _context.Blogs.FirstOrDefaultAsync(x => x.UrlSuffix == request.Blog.UrlSuffix);
                    suffixExtender += 1;

                }

                _context.Blogs.Add(request.Blog);
                user.Blogs.Add(request.Blog);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create the blog");

                return Result<Unit>.Success(Unit.Value);
            }


            private string RemoveWhitespace(string input)
            {
                return new string(input.ToCharArray()
                    .Where(c => !Char.IsWhiteSpace(c))
                    .ToArray());
            }
        }
    }
}