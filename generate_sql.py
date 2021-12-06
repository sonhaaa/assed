# TeacherId	TeacherName	TeacherEmail	TeacherPassword	TeacherOrganize	TeacherSpecialize
# 1023745837	Norah Belfelt	nbelfelt8@ustream.tv	wLQcJR0qxbE	Twitterlist	Editor
# 2533318612	Carmita Goodhew	cgoodhew7@msu.edu	dZ8Aq4CjvmnO	Riffpedia	Social Worker
# 3364714672	Mariellen Livesey	mlivesey0@washingtonpost.com	h38K73H	Dazzlesphere	VP Marketing
# 3471244494	Brandy Kivelle	bkivelle2@rediff.com	SqruV2WJUi	Innotype	Internal Auditor
# 4991125757	Yehudi Ege	yege5@live.com	RIk5IOul82Qa	Edgewire	Dental Hygienist
# 8985213324	Even Enoch	eenoch3@theguardian.com	CCRdMW62mqqJ	Shufflester	Marketing Assistant
# 9185021611	Portia Vanstone	pvanstone1@usgs.gov	8OdFlyEBTCB	Livetube	Nurse

import random as rd
import time

sql_out = open("sql_out.txt", "w")

teacher_id = [1023745837, 2533318612, 3364714672,
              3471244494, 4991125757, 8985213324, 9185021611]

_time = [10, 15, 20, 25, 30, 35, 40]

student_num = 5

question_set_tb = "QUESTIONSETS"
question_set_num = 5
question_set_id = []

question_tb = "QUESTIONS"
question_num = 5
question_id = []

student_result_tb = "STUDENTRESULTS"
student_result_num = 5

for i in range(question_set_num):
    question_set_id.append(rd.randrange(1000000000, 9999999999))
    sql_out.write("insert into {} (QuestionSetId, TeacherId, QuestionSetName, QuestionSetDay, QuestionSetNumberOfQuestion, QuestionSetNumberOfStudentJoined, QuestionSetTime) values ('{}', '{}', '{}', '{}', {}, {}, {})\n".format(
        question_set_tb,
        question_set_id[i],
        teacher_id[rd.randrange(0, len(teacher_id))],
        "Question Set Name " + str(i),
        time.time(),
        question_num,
        student_num,
        _time[rd.randrange(0, len(_time))],
    ))

sql_out.write("\n----- GAP -----\n")

for i in range(question_num * question_set_num):
    question_id.append(rd.randrange(1000000000, 9999999999))
    sql_out.write("insert into {} (QuestionId, QuestionSetId, QuestionTitle, QuestionReferenceAnswer) values ('{}', '{}', '{}', '{}')\n".format(
        question_tb,
        question_id[i],
        question_set_id[rd.randrange(0, len(question_set_id))],
        "Question Title " + str(i),
        "Question Reference Answer for Question " + str(i + 1)
    ))

sql_out.write("\n----- GAP -----\n")

for i in range(student_num * question_num * question_set_num):
    random_ques_id = question_id[rd.randrange(0, len(question_id))]
    sql_out.write("insert into {} (StudentResultId, QuestionId, StudentResultAnswer, StudentResultScores, StudentResultEmail, StudentResultVideoRecord) values ('{}', '{}', '{}', '{}', '{}', '{}')\n".format(
        student_result_tb,
        rd.randrange(1000000000, 9999999999),
        random_ques_id,
        "Student Answer for Question ID " + str(random_ques_id),
        rd.randrange(5, 11),
        "student" + str(i + 1) + "@gmail.com",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ))
