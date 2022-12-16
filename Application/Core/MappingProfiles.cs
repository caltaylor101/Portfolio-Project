using Application.Blogs;
using Application.Comments;
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
            CreateMap<AppUser, Profiles.Profile>();
            CreateMap<Blog, MyBlogsDto>();
            CreateMap<Photo, PhotoDto>();
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMainProfilePicture).Url));

        }

    }
}