
using System.Text;
using API.Services;
using Architecture.Security;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            

            return services;
        }

        private static void JwtBearerDefauls(AuthenticationOptions obj)
        {
            throw new NotImplementedException();
        }
    }
}