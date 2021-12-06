using System.ComponentModel.DataAnnotations;

namespace Assed.DTOs
{
    public class TeacherRead
    {
        public string TeacherId { get; set; }
        public string TeacherName { get; set; }
        public string TeacherEmail { get; set; }
        public string TeacherPassword { get; set; }
        public string TeacherOrganize { get; set; }

        public string TeacherSpecialize { get; set; }

        public string TeacherImage { get; set; }
    }
}