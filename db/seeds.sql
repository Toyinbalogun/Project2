USE task_db;

-- Insert a set of records.
INSERT INTO tasks (`id`, `name`, `userPass`, `taskID`) VALUES (0, "Ty Gibbins", "BatGirl123", randomID);

INSERT INTO tasks (`routeName`, `taskName`, `taskDescription`, `taskDeadline`) VALUES ("dancing-practice", "Dancing Practice", "Go for dance practice at 5pm", "Today at 5pm");
INSERT INTO tasks (`routeName`, `taskName`, `taskDescription`, `taskDeadline`) VALUES ("swimming-practice", "Swimming Practice", "Go for swim practice at 2pm", "Friday at 5pm");
INSERT INTO tasks (`routeName`, `taskName`, `taskDescription`, `taskDeadline`) VALUES ("midterm", "Midterm", "Study for midterm all day", "Next week Monday at 12am");