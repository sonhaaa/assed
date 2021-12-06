using Assed.DTOs;
using Assed.Models;
using AutoMapper;

namespace Assed.Profiles
{
    public class AssedProfile : Profile
    {
        public AssedProfile()
        {
            CreateMap<Teachers, TeacherRead>();
            CreateMap<TeacherCreate, Teachers>();
            CreateMap<TeacherUpdate, Teachers>();
            CreateMap<Teachers, TeacherUpdate>();

            CreateMap<QuestionSets, QuestionSetRead>();
            CreateMap<QuestionSetCreate, QuestionSets>();
            CreateMap<QuestionSetUpdate, QuestionSets>();
            CreateMap<QuestionSets, QuestionSetUpdate>();

            CreateMap<Questions, QuestionRead>();
            CreateMap<QuestionCreate, Questions>();
            CreateMap<QuestionUpdate, Questions>();
            CreateMap<Questions, QuestionUpdate>();

            CreateMap<StudentResults, StudentResultRead>();
            CreateMap<StudentResultCreate, StudentResults>();
            CreateMap<StudentResultUpdate, StudentResults>();
            CreateMap<StudentResults, StudentResultUpdate>();
        }
    }
}