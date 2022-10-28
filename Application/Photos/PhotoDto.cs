
namespace Application.Photos
{
    public class PhotoDto
    {
         public string Id { get; set; }
        public string Url { get; set; }
        public bool IsProfilePicture { get; set; }
        public bool IsMainProfilePicture { get; set; }
        public Guid? BlogId { get; set; }
    }
}