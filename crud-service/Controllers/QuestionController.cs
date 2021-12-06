using System.Collections.Generic;
using Assed.Data;
using Assed.DTOs;
using Assed.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Assed.Controllers
{
    [Route("api/questions")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public QuestionController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<QuestionRead>> GellAllQuestions()
        {
            var QuestionItem = _repo.GetAllQuestion();
            if (QuestionItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<QuestionRead>>(QuestionItem));
            }

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetQuestionById")]
        public ActionResult<QuestionRead> GetQuestionById(string id)
        {
            var QuestionItem = _repo.GetQuestionById(id);
            if (QuestionItem != null)
            {
                return Ok(_mapper.Map<QuestionRead>(QuestionItem));
            }
            return NotFound();
        }



        [HttpPost]
        public ActionResult<QuestionRead> CreateQuestion(QuestionCreate QuestionCreate)
        {
            var QuestionModel = _mapper.Map<Questions>(QuestionCreate);
            _repo.CreateQuestion(QuestionModel);
            _repo.SaveChanges();

            var QuestionRead = _mapper.Map<QuestionRead>(QuestionModel);

            // TODO
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateQuestion(string id, QuestionUpdate QuestionUpdate)
        {
            var QuestionModelFromRepo = _repo.GetQuestionById(id);
            if (QuestionModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(QuestionUpdate, QuestionModelFromRepo);

            _repo.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteQuestion(string id)
        {
            var QuestionModelFromRepo = _repo.GetQuestionById(id);
            if (QuestionModelFromRepo == null)
            {
                return NotFound();
            }

            _repo.DeleteQuestion(QuestionModelFromRepo);
            _repo.SaveChanges();

            return NoContent();
        }
    }
}