using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using FootballProject.Entities;

namespace FootballProject.Models.Responses
{
    public class CoachesWithClubsResponse
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Nationality { get; set; }
        public DateTime DataOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public int CountOfVictories { get; set; }
        public int YearsOfExpirience { get; set; }
        public int ClubId { get; set; }
        public string FootballClubName { get; set; }
    }
}