namespace Application.Blogs
{
    public class BlogDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Body { get; set; }
        public string UrlSuffix { get; set; }
        public UserBlogInfoDto AppUser { get; set; }

    }
}