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
    public class MachRepository:IMatchesRepository<int>
    {

        private string _connectionString;

        public MachRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
      
        public async Task<IEnumerable<Match>> GetAllMatches()
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_all_matches_with_stadiums;";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "MatchId"
            );
            return results;
        }
 
        public async Task<Match> GetMatchByMatchId(int matchId)
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_all_matches_with_stadiums @matchId = @MatchId;";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "MatchId",
                param:new
                {
                    MatchId = matchId
                }
            );
            return results.FirstOrDefault();
        }

        
        public async Task<IEnumerable<Match>> GetNextMatches()
        {
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"EXEC public.get_next_matches;";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "MatchId"
            );
            return results;
        }
    }
}