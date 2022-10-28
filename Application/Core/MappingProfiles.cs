using Application.Blogs;
using Application.Photos;
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
                // .ForMember(i => i.Photos.Select(p => new PhotoDto 
                // {
                //     Id = p.Id,
                //     Url = p.Url,
                //     IsProfilePicture = p.IsProfilePicture,
                //     IsMainProfilePicture = p.IsMainProfilePicture,
                //     BlogId = p.BlogId
                // }));
                
            CreateMap<AppUser, Profiles.Profile>();
                // .ForMember(i => i.Image, o => o.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMainProfilePicture).Url));
                // .ForMember(i => i.Photos, o => o.MapFrom(p => p.Photos.ToList()));
            CreateMap<Blog, MyBlogsDto>();
            CreateMap<Photo, PhotoDto>();


        }

    }
}