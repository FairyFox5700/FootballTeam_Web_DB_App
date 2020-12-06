using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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

        public async Task<TotalResultsForMatch> GetTotalResultsForMatchById(int matchId)
        {
            var query =
                @"SELECT m.match_id,m.match_name,
                        COUNT(red_card_count) as redCardTotalCount, 
                        COUNT(yellow_card_count) as yellowCardTotalCount, 
                        COUNT(scored_goales) as scoredGoalsTotalCount,
                        COUNT(missed_goales) as missedGoalsTotalCount
	                    FROM analytics.football_results fr
	                    LEFT JOIN analytics.cards c
	                    ON c.card_id = fr.card_id
	                    INNER JOIN analytics.scores s
	                    ON s.score_id = fr.score_id
	                    INNER JOIN organization.matches m
	                    ON m.match_id = fr.match_id
	                    GROUP BY m.match_id ,m.match_name
	                    ORDER BY scoredGoalsTotalCount desc";
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var results = await connection.QueryAsync<TotalResultsForMatch>(
                query,
                param: new
                {
                    matchId= matchId,
                }
            );
            return results.FirstOrDefault();
        }

        public async Task<TotalResultsForFootballer> GetTotalResultsForPlayerById(int playerId)
        {
            var query =
                        @"SELECT f.person_id ,f.first_name,f.middle_name,
                        COUNT(red_card_count) as redCardTotalCount, 
                        COUNT(yellow_card_count) as yellowCardTotalCount, 
                        COUNT(scored_goales) as scoredGoalsTotalCount,
                        COUNT(missed_goales) as missedGoalsTotalCount
                        FROM analytics.football_results fr
	                    LEFT JOIN analytics.cards c
	                    ON c.card_id = fr.card_id
	                    INNER JOIN analytics.scores s
	                    ON s.score_id = fr.score_id
	                    INNER JOIN public.footballers f
	                    ON f.person_id = fr.footballer_id
	                    WHERE f.person_id = @personId
	                    GROUP BY f.person_id ,f.first_name,f.middle_name
	                    ORDER BY  scoredGoalsTotalCount desc";
            await using var connection =  new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var results = await connection.QueryAsync<TotalResultsForFootballer>(
                query,
                param: new
                {
                    personId= playerId,
                }
            );
            return results.FirstOrDefault();
        }


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