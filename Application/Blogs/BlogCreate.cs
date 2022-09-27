using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
            private int suffixExtender = 1;
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //Create the UrlSuffix from the Title of the blog
                request.Blog.UrlSuffix = RemoveWhitespace(request.Blog.Title);
                //Get the current blog
                Task<Blog> currentBlog = _context.Blogs.FirstOrDefaultAsync(x => x.UrlSuffix == request.Blog.UrlSuffix);

                //Rename the URL until a name that isn't taken is available. 
                while (currentBlog.Result != null && !String.IsNullOrEmpty(currentBlog.Result.UrlSuffix))
                {
                    //Arbitrary addition for the number.
                    //This makes '&-' unavailable in the title.
                    request.Blog.UrlSuffix = request.Blog.UrlSuffix.Split("&-")[0];
                    request.Blog.UrlSuffix += "&-" + suffixExtender.ToString();
                    currentBlog = _context.Blogs.FirstOrDefaultAsync(x => x.UrlSuffix == request.Blog.UrlSuffix);
                    suffixExtender += 1;

                }

                _context.Blogs.Add(request.Blog);

                await _context.SaveChangesAsync();

                return Unit.Value;
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