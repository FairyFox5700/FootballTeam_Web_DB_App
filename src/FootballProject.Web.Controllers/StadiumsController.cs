using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/stadiums")]
    public class StadiumsController:ControllerBase
    {
        private readonly IStadiumsRepository<int> _stadiumsRepository;

        public StadiumsController(IStadiumsRepository<int> stadiumsRepository)
        {
            _stadiumsRepository = stadiumsRepository;
        }

        //GET api/sponsores?stadiumId={stadiumId}
        [HttpGet]
        [Route("stadiumId={stadiumId}")]
        public async Task<Stadium>  GetSponsoresByClubId(int stadiumId)
        {
            return await _stadiumsRepository.GetStadiumByIdWithAddresses(stadiumId);
        }
    }
}