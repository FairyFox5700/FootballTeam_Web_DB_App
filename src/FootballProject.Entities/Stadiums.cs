﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Stadiums
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StadiumId { get; set; }
        public string StadiumName { get; set; }
        public int Capacity { get; set; }
        public string YearOfBuild { get; set; }
        public string Surface { get; set; }
        [ForeignKey(nameof(AddressId))]
        public int AddressId { get; set; }

        public Addresses Address { get; set; }
        public ICollection<Matches> Matches { get; set; }
        public ICollection<Trainings> Trainings { get; set; }
    }
}
