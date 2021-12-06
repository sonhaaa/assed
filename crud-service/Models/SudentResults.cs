using System.ComponentModel.DataAnnotations;

namespace Assed.Models
{
    public class StudentResults
    {
        [Key]
        public string StudentResultId { get; set; }
        public string QuestionId { get; set; }
        public string StudentResultAnswer { get; set; }
        public string StudentResultScores { get; set; }
        public string StudentResultEmail { get; set; }
        public string StudentResultVideoRecord { get; set; }
    }
}