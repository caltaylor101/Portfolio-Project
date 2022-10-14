
namespace Domain
{
    public class BlogAuthor
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid BlogId { get; set; }
        public Blog Blog { get; set; }
        
    }
}