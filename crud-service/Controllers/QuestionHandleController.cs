
// [HttpGet("/getquestion/{id}", Name = "GetQuestionSetById")]
// public ActionResult<QuestionRead> GetQuestionByQuestionSetId(string id)
// {
//     var questionSetItem = _repo.GetQuestionSetById(id);
//     if (questionSetItem != null)
//     {
//         return Ok(_mapper.Map<QuestionSetRead>(questionSetItem));
//     }
//     return NotFound();
// }

using System.Collections.Generic;
using Assed.Data;
using Assed.DTOs;
using Assed.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Assed.Controllers
{
    [Route("api/getquestionbyquestionsetid")]
    [ApiController]
    public class ManipulateController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public ManipulateController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<QuestionRead> GetQuestionByQuestionSetId(string id)
        {
            var questionSetItem = _repo.GetQuestionsByQuestionSetId(id);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<QuestionRead>>(questionSetItem));
            }
            return NotFound();
        }
    }

    [Route("api/getallquestionbyemailandquestionid")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public StudentController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{questionsetid}/{email}")]
        public ActionResult<StudentResultRead> GetAllQuestionByEmailAndQuestionId(string questionsetid, string email)
        {
            var questionSetItem = _repo.GetAllQuestionByEmailAndQuestionId(questionsetid, email);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<StudentResultRead>>(questionSetItem));
            }
            return NotFound();
        }
    }

    [Route("api/getquestionsetbyteacherid")]
    [ApiController]
    public class GetQuestionSet : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public GetQuestionSet(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{teacherid}")]
        public ActionResult<QuestionSetRead> GetQuestionSetByTeacherId(string teacherid)
        {
            var questionSetItem = _repo.GetQuestionSetByTeacherId(teacherid);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<QuestionSetRead>>(questionSetItem));
            }
            return NotFound();
        }
    }

    [Route("api/getteacherbyemailandpassword")]
    [ApiController]
    public class GetTeacher : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public GetTeacher(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{email}/{password}")]
        public ActionResult<TeacherRead> GetTeacherByEmailAndPassword(string email, string password)
        {
            var questionSetItem = _repo.GetTeacherByEmailAndPassword(email, password);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<TeacherRead>(questionSetItem));
            }
            return NotFound();
        }
    }

    [Route("api/getstudentresultbyquestionid")]
    [ApiController]
    public class GetStudentResult : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public GetStudentResult(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{questionid}")]
        public ActionResult<StudentResultRead> GetStudentResultByQuestionId(string questionid)
        {
            var questionSetItem = _repo.GetStudentResultByQuestionId(questionid);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<StudentResultRead>>(questionSetItem));
            }
            return NotFound();
        }
    }
}
