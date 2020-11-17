using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class FootballerResultsRepository:IFootballersResultRepository<int>
    {
        private string _connectionString;

        public FootballerResultsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        //one to one not binding
       
        public async Task<IEnumerable<FootballResultsResponse>> GetFootballResultsByMatchId(int matchId)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "get_football_results_by_match_id";
            var results = await connection.QueryAsync<FootballResultsResponse>(
                query,
                param: new
                {
                    matchid= matchId,
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results;
        }

        public async Task<IEnumerable<FootballResultsResponse>> GetFootballerResultsByPlayersIdOrderedBy(int playerId, string orderBy)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"get_all_football_results_by_player_id_order_by";
            var results = await connection.QueryAsync<FootballResultsResponse>(query,
                param: new
                {
                    playerid= playerId,
                    orderby = orderBy
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results;
        }
    }
}