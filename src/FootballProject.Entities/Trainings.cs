using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FootballProject.Entities
{
    public class Trainings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TrainingId { get; set; }
        public DateTime TrainingData { get; set; }
        [ForeignKey(nameof(CoachId))]
        public int CoachId { get; set; }
        [ForeignKey(nameof(StadiumId))]
        public int StadiumId { get; set; }

        public Coaches Coach { get; set; }
        public Stadiums Stadium { get; set; }
    }
}
