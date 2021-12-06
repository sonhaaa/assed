using System;
using System.Collections.Generic;
using System.Linq;
using Assed.Models;

namespace Assed.Data
{
    public class AssedRepo : IAssedRepo
    {
        private readonly AssedDBContext _context;

        public AssedRepo(AssedDBContext context) => _context = context;

        #region Teacher

        public IEnumerable<Teachers> GetAllTeacher()
        {
            return _context.Teachers.ToList();
        }

        public void CreateTeacher(Teachers teacher)
        {
            if (teacher == null)
            {
                throw new ArgumentNullException(nameof(teacher));
            }
            _context.Teachers.Add(teacher);
        }

        public Teachers GetTeacherById(string id)
        {
            return _context.Teachers.FirstOrDefault(item => item.TeacherId == id);
        }

        public void UpdateTeacher(Teachers teacher)
        {
            // use mapping to update
        }

        public void DeleteTeacher(Teachers teacher)
        {
            if (teacher == null)
            {
                throw new ArgumentNullException(nameof(teacher));
            }
            _context.Teachers.Remove(teacher);
        }

        #endregion 

        #region QuestionSet

        public IEnumerable<QuestionSets> GetAllQuestionSet()
        {
            return _context.QuestionSets.ToList();
        }

        public void CreateQuestionSet(QuestionSets questionSet)
        {
            if (questionSet == null)
            {
                throw new ArgumentNullException(nameof(questionSet));
            }
            _context.QuestionSets.Add(questionSet);
        }

        public QuestionSets GetQuestionSetById(string id)
        {
            return _context.QuestionSets.FirstOrDefault(item => item.QuestionSetId == id);
        }

        public void UpdateQuestionSet(QuestionSets questionSet)
        {
            // Update use mapp
        }

        public void DeleteQuestionSet(QuestionSets questionSet)
        {
            if (questionSet == null)
            {
                throw new ArgumentNullException(nameof(questionSet));
            }
            _context.QuestionSets.Remove(questionSet);
        }

        #endregion

        #region Question

        public IEnumerable<Questions> GetAllQuestion()
        {
            return _context.Questions.ToList();
        }

        public void CreateQuestion(Questions question)
        {
            if (question == null)
            {
                throw new ArgumentNullException(nameof(question));
            }
            _context.Questions.Add(question);
        }

        public Questions GetQuestionById(string id)
        {
            return _context.Questions.FirstOrDefault(item => item.QuestionId == id);
        }

        public IEnumerable<Questions> GetQuestionsByQuestionSetId(string id)
        {
            return _context.Questions.Where(item => item.QuestionSetId == id);
        }

        public void UpdateQuestion(Questions question)
        {
            // update throw mapping
        }

        public void DeleteQuestion(Questions question)
        {
            if (question == null)
            {
                throw new ArgumentNullException(nameof(question));
            }
            _context.Questions.Remove(question);
        }

        #endregion

        #region StudentResult

        public IEnumerable<StudentResults> GetAllStudentResult()
        {
            return _context.StudentResults.ToList();
        }

        public void CreateStudentResult(StudentResults studentResult)
        {
            if (studentResult == null)
            {
                throw new ArgumentNullException(nameof(studentResult));
            }
            _context.StudentResults.Add(studentResult);
        }

        public StudentResults GetStudentResultById(string id)
        {
            return _context.StudentResults.FirstOrDefault(item => item.StudentResultId == id);
        }

        public void UpdateStudentResult(StudentResults studentResult)
        {
            // throw mapping
        }


        public void DeleteStudentResult(StudentResults studentResult)
        {
            if (studentResult == null) throw new ArgumentNullException(nameof(studentResult));
            _context.StudentResults.Remove(studentResult);
        }

        #endregion

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public IEnumerable<StudentResults> GetStudentResultByQuestionSetIdAndQuestionId(string questionsetid, string questionid)
        {
            var question = _context.Questions.FirstOrDefault(item => item.QuestionSetId == questionsetid & item.QuestionId == questionid);
            return _context.StudentResults.Where(item => item.QuestionId == question.QuestionId);
        }

        public IEnumerable<StudentResults> GetAllQuestionByEmailAndQuestionId(string questionsetid, string email)
        {
            var questions = _context.Questions.Where(item => item.QuestionSetId == questionsetid).ToList();
            var studentResults = _context.StudentResults.Where(item => item.StudentResultEmail == email).ToList();
            var result = new List<StudentResults>();
            foreach (var question in questions)
            {
                foreach (var studentResult in studentResults)
                {
                    if (question.QuestionId == studentResult.QuestionId) result.Add(studentResult);
                }
            }
            return result;
        }

        public IEnumerable<QuestionSets> GetQuestionSetByTeacherId(string teacherid)
        {
            return _context.QuestionSets.Where(item => item.TeacherId == teacherid);
        }

        public Teachers GetTeacherByEmailAndPassword(string email, string password)
        {
            return _context.Teachers.FirstOrDefault(item => item.TeacherEmail == email && item.TeacherPassword == password);
        }

        public IEnumerable<StudentResults> GetStudentResultByQuestionId(string questionid)
        {
            return _context.StudentResults.Where(item => item.QuestionId == questionid);
        }
    }
}