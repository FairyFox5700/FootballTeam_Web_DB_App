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
    public class MachRepository:IMatchesRepository<int>
    {

        private string _connectionString;

        public MachRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
      
        public async Task<IEnumerable<Match>> GetAllMatches()
        {
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "public.get_all_matches_with_stadiums";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "stadium_id",
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results;
        }
 
        public async Task<Match> GetMatchByMatchId(int matchId)
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"public.get_matches_by_match_id_with_details";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "stadium_id",
                param:new
                {
                    matchid = matchId
                },
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results.FirstOrDefault();
        }

        
        public async Task<IEnumerable<Match>> GetNextMatches()
        {
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = @"public.get_next_matches";
            var results = await connection.QueryAsync<Match, Stadium, Match>(query,
                (m, s) =>
                {
                    m.Stadium = s;
                    return m;
                },
                splitOn: "stadium_id",
                commandType:CommandType.StoredProcedure,
                commandTimeout:900
            );
            return results;
        }
    }
}