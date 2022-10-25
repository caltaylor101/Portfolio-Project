using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsProfilePicture { get; set; }
        public bool IsMainProfilePicture { get; set; }
        public Blog? Blog { get; set; }
    }
}