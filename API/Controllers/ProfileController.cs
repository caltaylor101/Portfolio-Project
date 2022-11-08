using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
        {
            System.Console.WriteLine(username);
            System.Console.WriteLine("test");
            System.Console.WriteLine("test");
            System.Console.WriteLine("test");
            System.Console.WriteLine("test");


            return HandleResult(await Mediator.Send(new ProfileDetails.Query{Username = username}));
        }

        
    }
}