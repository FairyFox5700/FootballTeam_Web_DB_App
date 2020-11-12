using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class TrainingRepository:ITrainingRepository<int>
    {
        private string _connectionString;

        public TrainingRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
   
        public async Task<IEnumerable<Training>> GetAllTrainingByCoachId(int coachId)
        {
            var query = @"EXEC public.get_all_trainings_by_coach_id @coachId = CoachId";
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return await connection.QueryAsync<Training>(
                query, new {CoachId =coachId}
            );
        }

        public async Task<Training> GetTrainingByTrainingId(int trainingId)
        {
            var query = @"EXEC public.get_training_by_training_Id_with_detailes @trainingId = TrainingId";
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return await connection.QueryFirstOrDefaultAsync<Training>(query, new {TrainingID =trainingId});
        }
    }
}