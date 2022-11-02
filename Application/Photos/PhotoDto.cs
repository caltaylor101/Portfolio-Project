
namespace Application.Photos
{
    public class PhotoDto
    {
         public string Id { get; set; }
        public string Url { get; set; }
        public string isProfilePicture { get; set; }
        public string isMainProfilePicture { get; set; }
        public Guid? BlogId { get; set; }
        public int? Order { get; set; }
    }
}