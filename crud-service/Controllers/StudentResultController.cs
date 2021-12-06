using System.Collections.Generic;
using Assed.Data;
using Assed.DTOs;
using Assed.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Assed.Controllers
{
    [Route("api/studentresults")]
    [ApiController]
    public class StudentResultController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public StudentResultController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StudentResultRead>> GellAllStudentResults()
        {
            var StudentResultItem = _repo.GetAllStudentResult();
            if (StudentResultItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<StudentResultRead>>(StudentResultItem));
            }

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetStudentResultById")]
        public ActionResult<StudentResultRead> GetStudentResultById(string id)
        {
            var StudentResultItem = _repo.GetStudentResultById(id);
            if (StudentResultItem != null)
            {
                return Ok(_mapper.Map<StudentResultRead>(StudentResultItem));
            }
            return NotFound();
        }

        [HttpGet("{questionsetid}/{questionid}")]
        public ActionResult<IEnumerable<StudentResultRead>> GetStudentResultByQuestionSetIdAndQuestionId(string questionsetid, string questionid)
        {
            var StudentResultItem = _repo.GetStudentResultByQuestionSetIdAndQuestionId(questionsetid, questionid);
            if (StudentResultItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<StudentResultRead>>(StudentResultItem));
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<StudentResultRead> CreateStudentResult(StudentResultCreate StudentResultCreate)
        {
            var StudentResultModel = _mapper.Map<StudentResults>(StudentResultCreate);
            _repo.CreateStudentResult(StudentResultModel);
            _repo.SaveChanges();

            var StudentResultRead = _mapper.Map<StudentResultRead>(StudentResultModel);

            // TODO
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateStudentResult(string id, StudentResultUpdate StudentResultUpdate)
        {
            var StudentResultModelFromRepo = _repo.GetStudentResultById(id);
            if (StudentResultModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(StudentResultUpdate, StudentResultModelFromRepo);

            _repo.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteStudentResult(string id)
        {
            var StudentResultModelFromRepo = _repo.GetStudentResultById(id);
            if (StudentResultModelFromRepo == null)
            {
                return NotFound();
            }

            _repo.DeleteStudentResult(StudentResultModelFromRepo);
            _repo.SaveChanges();

            return NoContent();
        }
    }
}