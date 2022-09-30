using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogList
    {
        public class Query : IRequest<Result<List<Blog>>> { } //parameters go in the brackets

        public class Handler : IRequestHandler<Query, Result<List<Blog>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Blog>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Blog>>.Success(await _context.Blogs.ToListAsync());
            }
        }
    }
}