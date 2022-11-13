using System.Security.Claims;
using API.DTOs;
using API.Services;
using Application.Blogs;
using Application.Photos;
using AutoMapper;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, IMapper mapper, DataContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem();
            }



            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            foreach (var validator in _userManager.PasswordValidators)
            {
                var validatorResult = await validator.ValidateAsync(_userManager, user, registerDto.Password);

                if (!validatorResult.Succeeded)
                {
                    ModelState.AddModelError("Password", "Password too weak.");
                    return ValidationProblem();
                }
            }

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return ValidationProblem("Problem with user registration.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized();
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Image = user?.Photos?.FirstOrDefault(x => x.IsMainProfilePicture)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpGet("bio")]
        public async Task<ActionResult<string>> GetCurrentUserBio() 
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return user.Bio;
        }

        [Authorize]
        [HttpGet("my-blogs")]
        public async Task<ActionResult<List<MyBlogsDto>>> GetCurrentUserBlogs()
        {
            var user = await _userManager.Users.Include(b => b.Blogs).Include(i => i.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var blogsToReturn = _mapper.Map<List<MyBlogsDto>>(user.Blogs);
            
            return blogsToReturn;
        }

        [Authorize]
        [HttpGet("get-user-profile")]
        public async Task<ActionResult<Application.Profiles.Profile>> GetCurrentUserProfile()
        {
            var user = await _userManager.Users.Include(i => i.Photos.Where(p => p.IsMainProfilePicture))
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            var userToReturn = _mapper.Map<Application.Profiles.Profile>(user);

            return userToReturn;
        }

        [Authorize]
        [HttpGet("get-user-pictures/{isProfilePicture}")]
        public async Task<ActionResult<ICollection<PhotoDto>>> GetCurrentUserPhotos(bool isProfilePicture)
        {
            var user = isProfilePicture ? await _userManager.Users.Include(i => i.Photos.Where(p => p.IsProfilePicture))
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email))
                : await _userManager.Users.Include(i => i.Photos.Where(p => !p.IsProfilePicture && p.BlogId == null))
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var photosToReturn = _mapper.Map<PhotoDto[]>(user.Photos); 
            return photosToReturn;
        }

        
    }
}