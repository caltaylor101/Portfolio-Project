using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogList
    {
        public class Query : IRequest<List<Blog>> { } //parameters go in the brackets

        public class Handler : IRequestHandler<Query, List<Blog>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Blog>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Blogs.ToListAsync();
            }
        }
    }
}