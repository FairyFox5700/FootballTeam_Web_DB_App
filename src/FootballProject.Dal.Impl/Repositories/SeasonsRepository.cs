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
    public class SeasonsRepository:ISeasonesRepository<int>
    {
        private string _connectionString;

        public SeasonsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString();
        }
   
        public async Task<IEnumerable<Season>> GetSeasonesByClubsId(int clubId)
        {
            var sql= "get_all_seasones_by_club_id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Season>(sql, 
                new {сlubid = clubId },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900);
            return result;
        }

        public async Task<Season> GetSeasonById(int id)
        {
            var sql = @"SELECT s.season_id, s.league_name
                      FROM public.seasones s
                      WHERE season_id= @id";
            await using var connection =  new NpgsqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Season>(sql, 
                new { id = id });
            return result.FirstOrDefault();
        }
    }
}