using System.Collections.Generic;
using Assed.Data;
using Assed.DTOs;
using Assed.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Assed.Controllers
{
    [Route("api/questionsets")]
    [ApiController]
    public class QuestionSetController : ControllerBase
    {
        private readonly IAssedRepo _repo;
        private readonly IMapper _mapper;

        public QuestionSetController(IAssedRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<QuestionSetRead>> GellAllQuestionSets()
        {
            var questionSetItem = _repo.GetAllQuestionSet();
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<IEnumerable<QuestionSetRead>>(questionSetItem));
            }

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetQuestionSetById")]
        public ActionResult<QuestionSetRead> GetQuestionSetById(string id)
        {
            var questionSetItem = _repo.GetQuestionSetById(id);
            if (questionSetItem != null)
            {
                return Ok(_mapper.Map<QuestionSetRead>(questionSetItem));
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<QuestionSetRead> CreateQuestionSet(QuestionSetCreate questionSetCreate)
        {
            var questionSetModel = _mapper.Map<QuestionSets>(questionSetCreate);
            _repo.CreateQuestionSet(questionSetModel);
            _repo.SaveChanges();

            var questionSetRead = _mapper.Map<QuestionSetRead>(questionSetModel);

            // TODO
            // return CreatedAtRoute(nameof(GetQuestionSetById), new { Id = questionSetRead.QuestionSetId, questionSetRead });
            return Ok();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateQuestionSet(string id, QuestionSetUpdate questionSetUpdate)
        {
            var questionSetModelFromRepo = _repo.GetQuestionSetById(id);
            if (questionSetModelFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(questionSetUpdate, questionSetModelFromRepo);

            _repo.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteQuestionSet(string id)
        {
            var questionSetModelFromRepo = _repo.GetQuestionSetById(id);
            if (questionSetModelFromRepo == null)
            {
                return NotFound();
            }

            _repo.DeleteQuestionSet(questionSetModelFromRepo);
            _repo.SaveChanges();

            return NoContent();
        }
    }
}