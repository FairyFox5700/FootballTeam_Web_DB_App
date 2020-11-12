using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Dapper;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.Extensions.Configuration;

namespace FootballProject.Dal.Impl.Repositories
{
    public class CoachRepository:ICoachRepository<int>
    {
        private string _connectionString;

        public CoachRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public  async Task<IEnumerable<Coach>> GetCoachesWithClubsById(int coachId)
        {
            var query = @"EXEC get_coach_by_id_with_club @coachId=CoachId";
            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            var footballClubsDictionary = new Dictionary<int,  Coach>();
            return await connection.QueryAsync<Coach,FootballClub, Coach>(
                query,
                map: (c, fc) =>
                {
                    Coach coach;
                    if (!footballClubsDictionary.TryGetValue(c.PersonId, out coach))
                    {
                        coach = c;
                        coach.FootballClubs = new List<FootballClub>();
                        footballClubsDictionary.Add(c.PersonId, coach);
                    }

                    coach.FootballClubs.Add(fc);
                    return coach;
                },
                splitOn: "PersonId"
            );
        }
    }
}