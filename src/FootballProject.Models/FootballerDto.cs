using System;

namespace FootballProject.Models
{
    public class FootballerDto
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Nationality { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public int? RoleId { get; set; }
    }
}