using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/footballersResults")]
    public class FootballersResultController : ControllerBase
    {
        private readonly IFootballersResultRepository<int> _footballersResultRepository;

        public FootballersResultController(IFootballersResultRepository<int> footballersResultRepository)
        {
            _footballersResultRepository = footballersResultRepository;
        }
        
        //GET api/footballersResults?matchId={matchId}
        [HttpGet]
        [Route("matchId={matchId}")]
        public async Task<IEnumerable<FootballResults>> GetFootballResultsByMatchId(int matchId)
        {
            return await _footballersResultRepository.GetFootballResultsByMatchId(matchId);
        }
        //GET api/footballersResults?playerId={playerId}
        [HttpGet]
        [Route("playerId={playerId}&orderBy={orderBy}")]
        public async Task<IEnumerable<FootballResults>> GetFootballerResultsByPlayersIdOrderedBy(int playerId, string orderBy)
        {
            return await _footballersResultRepository.GetFootballerResultsByPlayersIdOrderedBy(playerId,orderBy);
        }
    }

}