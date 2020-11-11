using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Entities;

namespace FootballProject.Dal.Abstract.Repositories
{
    public interface ITrainingRepository<in TKey> where TKey: struct
    {
        public Task<IEnumerable<Training>> GetAllTrainingByCoachId(int coachId);
        public Task<Training> GetTrainingByTrainingId(int trainingId);
    }
}