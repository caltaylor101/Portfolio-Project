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
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(i => i.Image, o => o.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMainProfilePicture).Url));
            CreateMap<Blog, MyBlogsDto>();
        }
    }
}