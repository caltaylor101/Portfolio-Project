using Application.Blogs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Blog, Blog>();
            CreateMap<Blog, BlogDto>();
        }
    }
}