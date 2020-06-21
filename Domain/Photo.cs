namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}