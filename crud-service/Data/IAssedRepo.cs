using System.Collections.Generic;
using Assed.Models;

namespace Assed.Data
{
    public interface IAssedRepo
    {
        bool SaveChanges();

        IEnumerable<Teachers> GetAllTeacher();
        Teachers GetTeacherById(string id);
        void CreateTeacher(Teachers teacher);
        void UpdateTeacher(Teachers teacher);
        void DeleteTeacher(Teachers teacher);

        IEnumerable<QuestionSets> GetAllQuestionSet();
        QuestionSets GetQuestionSetById(string id);
        void CreateQuestionSet(QuestionSets questionSet);
        void UpdateQuestionSet(QuestionSets questionSet);
        void DeleteQuestionSet(QuestionSets questionSet);

        IEnumerable<Questions> GetAllQuestion();
        Questions GetQuestionById(string id);
        void CreateQuestion(Questions question);
        void UpdateQuestion(Questions question);
        void DeleteQuestion(Questions question);
        IEnumerable<Questions> GetQuestionsByQuestionSetId(string id);

        IEnumerable<StudentResults> GetAllStudentResult();
        StudentResults GetStudentResultById(string id);
        void CreateStudentResult(StudentResults studentResult);
        void UpdateStudentResult(StudentResults studentResult);
        void DeleteStudentResult(StudentResults studentResult);

        IEnumerable<StudentResults> GetStudentResultByQuestionSetIdAndQuestionId(string questionsetid, string questionid);
        IEnumerable<StudentResults> GetAllQuestionByEmailAndQuestionId(string questionsetid, string email);

        IEnumerable<QuestionSets> GetQuestionSetByTeacherId(string teacherid);
        Teachers GetTeacherByEmailAndPassword(string email, string password);

        IEnumerable<StudentResults> GetStudentResultByQuestionId(string questionid);
    }
}