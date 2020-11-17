﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
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
        [HttpGet]
        [Route("order/search")]
        public async Task<IEnumerable<Footballer>> GetAllFootballer([FromQuery]string search, [FromQuery]bool ascending)
        {
            return await _footballerRepository.GetFootballersOrdered(search,ascending);
        }
    }
}