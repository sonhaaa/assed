using System.Collections.Generic;
using Assed.Data;
using Assed.DTOs;
using Assed.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Assed.Controllers
{
    [Route("api/teachers")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public TeacherController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TeacherRead>> GellAllTeachers()
        {
            var teacherItem = _repo.GetAllTeacher();
            if (teacherItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<TeacherRead>>(teacherItem));
            }

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetTeacherById")]
        public ActionResult<TeacherRead> GetTeacherById(string id)
        {
            var teacherItem = _repo.GetTeacherById(id);
            if (teacherItem != null)
            {
                return Ok(_mapper.Map<TeacherRead>(teacherItem));
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<TeacherRead> CreateTeacher(TeacherCreate teacherCreate)
        {
            var teacherModel = _mapper.Map<Teachers>(teacherCreate);
            _repo.CreateTeacher(teacherModel);
            _repo.SaveChanges();

            var teacherRead = _mapper.Map<TeacherRead>(teacherModel);

            // TODO
            return CreatedAtRoute(nameof(GetTeacherById), new { Id = teacherRead.TeacherId, teacherRead });
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTeacher(string id, TeacherUpdate teacherUpdate)
        {
            var teacherModelFromRepo = _repo.GetTeacherById(id);
            if (teacherModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(teacherUpdate, teacherModelFromRepo);

            _repo.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTeacher(string id)
        {
            var teacherModelFromRepo = _repo.GetTeacherById(id);
            if (teacherModelFromRepo == null)
            {
                return NotFound();
            }

            _repo.DeleteTeacher(teacherModelFromRepo);
            _repo.SaveChanges();

            return NoContent();
        }
    }
}