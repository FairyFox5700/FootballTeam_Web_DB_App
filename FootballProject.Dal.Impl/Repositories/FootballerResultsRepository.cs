using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class FootballerResultsRepository:IFootballersResultRepository<int>
    {
        private string _connectionString;

        public FootballerResultsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
       
        public async Task<IEnumerable<FootballResults>> GetFootballResultsByMatchId(int matchId)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_football_results_by_match_id @matchId = @MatchId";
            var results = await connection.QueryAsync<FootballResults,Card,Score,FootballResults>(query,
                (f, c,s) =>
                {
                    f.Score = s;
                    f.Card = c;
                    return f;
                },
                splitOn: "ResultId",
                param: new
                {
                    MatchId= matchId,
                }
            );
            return results;
        }

        public async Task<IEnumerable<FootballResults>> GetFootballerResultsByPlayersIdOrderedBy(int playerId, string orderBy)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_all_football_results_by_player_id_order_by @playerId = @PlayerId, @orderBy= @OrderBy";
            var results = await connection.QueryAsync<FootballResults,Card,Score,FootballResults>(query,
                (f, c,s) =>
                {
                    f.Score = s;
                    f.Card = c;
                    return f;
                },
                splitOn: "ResultId",
                param: new
                {
                    PlayerId= playerId,
                    OrderBy = orderBy
                }
            );
            return results;
        }
    }
}