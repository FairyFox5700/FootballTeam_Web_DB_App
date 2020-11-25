using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Footballer:Person
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [ForeignKey(nameof(PersonId))]
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        [ForeignKey(nameof(RoleId))]
        public int? RoleId { get; set; }

        public Role Role { get; set; }
        public ICollection<FootballResults> FootballResults { get; set; }
    }
}
