using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/sponsores")]
    public class SponsoresController:ControllerBase
    {
        private readonly ISponsoresRepository<int> _sponsoresRepository;

        public SponsoresController(ISponsoresRepository<int> sponsoresRepository)
        {
            _sponsoresRepository = sponsoresRepository;
        }
        
        //GET api/sponsores/club/{clubId}
        [HttpGet]
        [Route("club/{clubId}")]
        public async  Task<IEnumerable<Sponsor>>  GetSponsoresByClubId(int clubId)
        {
            return await _sponsoresRepository.GetSponsoresByClubId(clubId);
        }
        
        //GET api/sponsores/{sponsorId}
        [HttpGet]
        [Route("{sponsorId}")]
        public async  Task<Sponsor>  GetSponsorById([FromRoute]int sponsorId)
        {
            return await _sponsoresRepository.GetSponsorById(sponsorId);
        }
    }
}