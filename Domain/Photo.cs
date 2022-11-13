using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsProfilePicture { get; set; }
        public bool IsMainProfilePicture { get; set; }
        public Blog? Blog { get; set; }
        [ForeignKey("Blog")]
        public Guid? BlogId { get; set; }
        public int? Order { get; set; }
    }
}