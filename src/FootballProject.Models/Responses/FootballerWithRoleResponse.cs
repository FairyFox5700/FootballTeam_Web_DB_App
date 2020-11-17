using System;
using System.ComponentModel.DataAnnotations.Schema;
using FootballProject.Entities;

namespace FootballProject.Models.Responses
{
    public class FootballerWithRoleResponse
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Nationality { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public string RoleName { get; set; }
    }
}