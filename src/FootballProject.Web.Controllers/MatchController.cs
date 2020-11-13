using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/matches")]
    public class MatchController:ControllerBase
    {
        private readonly IMatchesRepository<int> _matchesRepository;

        public MatchController(IMatchesRepository<int> matchesRepository)
        {
            _matchesRepository = matchesRepository;
        }
        
        //GET api/matches
        [HttpGet]
        public async Task<IEnumerable<Match>> GetAllMatches()
        {
            return await _matchesRepository.GetAllMatches();
        }
        
        //GET api/matches?matchId={matchId}
        [HttpGet]
        [Route("matchId={matchId}")]
        public async  Task<Match> GetAllMatches(int matchId)
        {
            return await _matchesRepository.GetMatchByMatchId(matchId);
        }
        
        //GET api/nextMatches
        [HttpGet]
        [Route("nextMatches")]
        public async Task<IEnumerable<Match>> GetNextMatches()
        {
            return await _matchesRepository.GetNextMatches();
        }

        
    }
}