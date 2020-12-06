namespace FootballProject.Models.Responses
{
    public class FootballerClubsWithLogosResponse
    {
        public int FootballClubId { get; set; }
        public string FootballClubName { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }
    }
}