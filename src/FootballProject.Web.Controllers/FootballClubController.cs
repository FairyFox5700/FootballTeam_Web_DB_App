using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/footballClubs")]
    public class FootballClubController : ControllerBase
    {
        private readonly IFootballerClubsRepository<int> _footballerClubsRepository;

        public FootballClubController(IFootballerClubsRepository<int> footballerClubsRepository)
        {
            _footballerClubsRepository = footballerClubsRepository;
        }

        //GET api/footballClub
        [HttpGet]
        public async Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos()
        {
            return await _footballerClubsRepository.GetFootballClubsWithLogos();
        }


        //GET api/footballClub?clubId={footballerClubId}
        [HttpGet]
        [Route("clubId={footballerClubId}")]
        public async Task<FootballClub> GetFootballClubsById(int footballerClubId)
        {
            return await _footballerClubsRepository.GetFootballClubsById(footballerClubId);
        }

        //GET api/footballClub?playerId={playerId}
        [HttpGet]
        [Route("playerId={playerId}")]
        public async Task<IEnumerable<FootballClub>> GetFootballClubsWithLogos(int playerId)
        {
            return await _footballerClubsRepository.GetFootballClubsByPlayerId(playerId);
        }
    }
}