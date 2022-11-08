using Microsoft.AspNetCore.Identity;

namespace Domain;
public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public ICollection<Blog> Blogs { get; set; } = new List<Blog>();
    public ICollection<Photo> Photos { get; set; } = new List<Photo>();
}
