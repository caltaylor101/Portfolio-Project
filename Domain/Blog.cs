
namespace Domain
{
    public class Blog
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Body { get; set; }
        public string UrlSuffix { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public AppUser AppUser { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}