using Application.Photos;
using Application.Posts;
using AutoMapper;
using Domain;

namespace Application
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostDto>();
            CreateMap<AppUser, UserDto>();
            CreateMap<Domain.Like, LikeDto>()
                .ForMember(l => l.UserName, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(l => l.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName));
            
            CreateMap<AppUser, Profiles.Profile>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}