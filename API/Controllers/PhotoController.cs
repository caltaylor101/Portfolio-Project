using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotoController : BaseApiController
    {
        [Authorize]
        [HttpPost("{isProfilePicture}")]
        public async Task<IActionResult> Add([FromForm] IFormFile file, bool isProfilePicture)
        {
            return HandleResult(await Mediator.Send(new  AddPhoto.Command{File = file, IsProfilePicture = isProfilePicture}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command{Id = id}));
        }

        [HttpPost("{id}/setMainPhoto")]
        public async Task<IActionResult> SetMainPhoto(string id)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command{Id = id}));
        }

    }
}