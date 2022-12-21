using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
            
        }

        [Authorize]
        public async Task SendComment(CreateComment.Command command)
        {
            var comment = await _mediator.Send(command);

            await Clients.Group(command.BlogId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }
        [Authorize]
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var blogId = httpContext.Request.Query["blogId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, blogId);
            var result = await _mediator.Send(new CommentList.Query{BlogId = Guid.Parse(blogId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}