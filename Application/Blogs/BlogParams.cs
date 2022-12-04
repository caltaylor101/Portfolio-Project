using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Blogs
{
    public class BlogParams : PagingParams
    {
        
        public string? Category { get; set; }
    }
}