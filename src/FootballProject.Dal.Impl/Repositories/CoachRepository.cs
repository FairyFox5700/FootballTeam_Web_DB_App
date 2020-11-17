using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MiniProfiler.Integrations;
using Npgsql;

namespace FootballProject.Dal.Impl.Repositories
{
    public class CoachRepository:ICoachRepository<int>
    {
        private readonly ILogger<CoachRepository> _logger;
        private string _connectionString;

        public CoachRepository(IConfiguration configuration, ILogger<CoachRepository>logger)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public  async Task<IEnumerable<Coach>> GetCoachesWithClubsById(int coachId)
        {
            var query  ="get_coach_by_id_with_club";
            var coachDictionary = new Dictionary<int, Coach>();
            await using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            var result = await connection.QueryAsync<Coach,FootballClub,Coach>(
                query, 
                param:new {coachid = coachId},
                map: (c, f) =>
                {
                    Coach coach;
                    if (!coachDictionary.TryGetValue(c.PersonId, out coach))
                    {
                        coach= c;
                        coach.FootballClubs = new List<FootballClub>();
                        coachDictionary.Add(c.PersonId, coach);
                    }

                    coach.FootballClubs.Add(f);
                    return coach;
                    
                },
                commandType:CommandType.StoredProcedure,
                splitOn:"club_id"
            );
            return result;
        }
    }
}