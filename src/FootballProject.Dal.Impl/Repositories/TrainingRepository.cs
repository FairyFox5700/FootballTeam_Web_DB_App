using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class TrainingRepository:ITrainingRepository<int>
    {
        private string _connectionString;

        public TrainingRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString();
        }
   
        public async Task<IEnumerable<Training>> GetAllTrainingByCoachId(int coachId)
        {
            var query = @"public.get_all_trainings_by_coach_id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            return await connection.QueryAsync<Training,Coach,Training>(
                query, map:(t,c)=>
                {
                    t.Coach = c;
                    return t;
                },
            new {coachid = coachId},
                splitOn:"coach_id",
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
        }

        public async Task<Training> GetTrainingByTrainingId(int trainingId)
        {
            var query = @"public.get_training_by_training_Id_with_detailes";
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var result= await connection.QueryAsync<Training,Stadium,Address,Training>(query, 
                map:(t,s, a)=>
                {
                    t.Stadium = s;
                    t.Stadium.Address = a;
                    return t;
                },
                splitOn:"stadium_id,address_id",
                param:new {trainingid =trainingId}, 
                commandType:CommandType.StoredProcedure,
                commandTimeout:900);
            return result.FirstOrDefault();
        }
    }
}