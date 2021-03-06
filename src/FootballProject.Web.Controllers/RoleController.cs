﻿using System.Collections.Generic;
using System.Threading.Tasks;
using FootballProject.Dal.Abstract.Repositories;
using FootballProject.Entities;
using FootballProject.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace FootballProject.Web.Controllers
{
    [ApiController]
    [Route("api/roles")]
    public class RoleController:ControllerBase
    {
        private readonly IRoleRepository<int> _roleRepository;

        public RoleController(IRoleRepository<int> roleRepository)
        {
            _roleRepository = roleRepository;
        }
        
        //GET api/roles
        [HttpGet]
        public async  Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _roleRepository.GetAllRoles();
        }
        
        //GET api/roles/{roleName}
        [HttpGet]
        [Route("{roleName}")]
        public async  Task<IEnumerable<FootballerByRoleCountModel>> GetAllMatches(string roleName)
        {
            return await _roleRepository.GetFootballersCountByRoleName(roleName);
        }
    }
}