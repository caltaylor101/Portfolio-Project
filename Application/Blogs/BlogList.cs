using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Blogs
{
    public class BlogList
    {
        public class Query : IRequest<Result<List<BlogDto>>> { } //parameters go in the brackets

        public class Handler : IRequestHandler<Query, Result<List<BlogDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogs = await _context.Blogs.Include(a => a.Authors).ToListAsync(cancellationToken);

                var blogsToReturn = _mapper.Map<List<BlogDto>>(blogs);

                return Result<List<BlogDto>>.Success(blogsToReturn);
            }
        }
    }
}