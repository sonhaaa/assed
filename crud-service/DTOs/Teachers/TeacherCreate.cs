using System.ComponentModel.DataAnnotations;

namespace Assed.DTOs
{
    public class TeacherCreate
    {
        [Key]
        [Required]
        public string TeacherId { get; set; }

        [Required]
        public string TeacherName { get; set; }

        [Required]
        public string TeacherEmail { get; set; }

        [Required]
        public string TeacherPassword { get; set; }

        public string TeacherOrganize { get; set; }
    }
}