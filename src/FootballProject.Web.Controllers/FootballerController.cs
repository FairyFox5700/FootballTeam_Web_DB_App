using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/footballers")]
    public class FootballerController:ControllerBase
    {
        private readonly IFootballerRepository<int> _footballerRepository;

        public FootballerController(IFootballerRepository<int> footballerRepository)
        {
            _footballerRepository = footballerRepository;
        }
        
        //GET api/footballer
        [HttpGet]
        public async Task<IEnumerable<Footballer>> GetAllFootballer()
        {
            return await _footballerRepository.GetFootballers();
        }
        
        //GET api/footballer/footballersWithRoles
        [HttpGet]
        [Route("footballersWithRoles")]
        public async Task<IEnumerable<Footballer>> GetFootballersWithRoles()
        {
            return await _footballerRepository.GetFootballersWithRoles();
        }
        
        //GET api/footballer/{name}
        [HttpGet]
        [Route("{name}")]
        public async Task<IEnumerable<Footballer>> GetAllFootballer(string roleName)
        {
            return await _footballerRepository.GetFootballersByRoleName(roleName);
        }
        
        //GET api/footballer/?name={name}&surname={surname}&nationality={nationality}
        [HttpGet]
        public async Task<IEnumerable<Footballer>> GetAllFootballers([FromQuery]FootballerRequestModel footballerRequestModel)
        {
            return await _footballerRepository.GetFootballersByNameSurnameNationality(
                footballerRequestModel.Name,
                footballerRequestModel.SurName,
                footballerRequestModel.Nationality);
        }
        
        //GET api/footballer/?{footballerId}
        [HttpGet]
        [Route("{footballerId:int}")]
        public async Task<Footballer> GetFootballerById(int footballerId)
        {
            return await _footballerRepository.GetFootballerById(footballerId);
        }
      
        //GET api/footballer/?{name}&{surname}&{nationality}
        [HttpGet]
        [Route("search={search}&asc={ascending}")]
        public async Task<IEnumerable<Footballer>> GetAllFootballer(string search, bool ascending)
        {
            return await _footballerRepository.GetFootballersOrdered(search,ascending);
        }
    }
}