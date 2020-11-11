using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class SeasonsRepository:ISeasonesRepository<int>
    {
        private string _connectionString;

        public SeasonsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
   
        public async Task<IEnumerable<Season>> GetSeasonesByClubsId(int clubId)
        {
            var sql= @"EXEC public.get_all_seasones_by_club_id @clubId = @ClubId";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Season>(sql, new {ClubId = clubId });
            return result;
        }

        public async Task<Season> GetSeasonById(int id)
        {
            var sql = "SELECT season_id, league_name " +
                      "FROM public.seasones s " +
                      "WHERE SeasonId= @id;";
            await using var connection = new SqlConnection(_connectionString);
            connection.Open();
            var result = await connection.QueryAsync<Season>(sql, new { Id = id });
            return result.FirstOrDefault();
        }
    }
}