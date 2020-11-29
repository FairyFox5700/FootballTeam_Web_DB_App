using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models;
using FootballProject.Models.Requests;
using FootballProject.Models.Responses;
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
        
        //GET api/footballer/roles
        [HttpGet]
        [Route("roles")]
        public async Task<IEnumerable<Footballer>> GetFootballersWithRoles()
        {
            return await _footballerRepository.GetFootballersWithRoles();
        }
        
        //GET api/footballer/name/{name}
        [HttpGet]
        [Route("name/{roleName}")]
        public async Task<IEnumerable<Footballer>> GetAllFootballer([FromRoute]string roleName)
        {
            return await _footballerRepository.GetFootballersByRoleName(roleName);
        }
        
        //GET api/footballer/?name={name}&surname={surname}&nationality={nationality}
        [HttpGet]
        [Route("filter")]
        public async Task<IEnumerable<Footballer>> GetAllFootballers([FromQuery]FootballerRequestModel footballerRequestModel)
        {
            return await _footballerRepository.GetFootballersByNameSurnameNationality(
                footballerRequestModel.Name,
                footballerRequestModel.SurName,
                footballerRequestModel.Nationality);
        }
        
        //GET api/footballer/{footballerId}
        [HttpGet]
        [Route("{footballerId}")]
        public async Task<Footballer> GetFootballerById([FromRoute]int footballerId)
        {
            return await _footballerRepository.GetFootballerById(footballerId);
        }
      
        //GET api/footballer/order/?{name}&{surname}&{nationality}
        //http://localhost:12250/api/footballers/order/search/?search=nationality&ascending=true
        [HttpGet]
        [Route("order/search")]
        public async Task<IEnumerable<Footballer>> GetAllFootballer([FromQuery]string search, [FromQuery]bool ascending)
        {
            return await _footballerRepository.GetFootballersOrdered(search,ascending);
        }

        [HttpPost]
        public async Task<int> AddFootballer(FootballerDto footballerDto)
        {
            return await _footballerRepository.AddFootballer(footballerDto);
        }
        
        [HttpPut]
        public async Task<int> UpdateFootballer(FootballerDto footballerDto)
        {
            return await _footballerRepository.UpdateFootballer(footballerDto);
        }

        [HttpDelete("{footballerId}")]
        public async Task<int> DeleteFootballer(int footballerId)
        {
            return await _footballerRepository.DeleteFootballer(footballerId);
        }
    }
}