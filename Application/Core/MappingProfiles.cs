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
                // .ForMember(i => i.Photos, o => o.MapFrom(p => p.Photos.ToList()));
            CreateMap<Blog, MyBlogsDto>();

            CreateMap<Photo, Profiles.Profile>()
                .ForMember(i => i.Photos, o => o.MapFrom(p => p.Id));


        }

    }
}