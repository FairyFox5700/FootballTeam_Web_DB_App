using FootballProject.Entities;

namespace FootballProject.Models.Responses
{
    public class  FootballerByRoleCountModel
    {
        public int RoleId { get; set; }
        public  string RoleName { get; set; }
        public int FootballersCount { get; set; }
    }
}