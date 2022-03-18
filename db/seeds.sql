INSERT INTO departments (dept_name)
VALUES
('Admissions'),
('Administration'),
('Teachers');

INSERT INTO roles (job_title, department, salary)
VALUES
('Head Accountant', 2, 80000),
('Science Teacher', 3, 75000),
('Principal', 2, 150000),
('Custodian', 2, 650000),
('Office Asst', 2, 70000),
('English Teacher', 3, 75000),
('German Teacher', 3, 75000),
('History Teacher', 3, 75000),
('Biology Teacher', 3, 75000),
('Admissions Officer', 1, 70000),
('Office Manager', 2, 75000),
('Operations Manager', 2, 75000),
('Admissions Manager', 1, 75000),
('Superintendant', 2, 200000),
('Head Teacher', 3, 80000);

INSERT INTO employees (first_name, last_name, manager, job_title)
VALUES
('Rufus', 'Pichler', NULL, 14),
('Claudia', 'Mueller', 1, 3),
('Kay', 'Naumann', 1, 13),
('Franklin', 'Brown', 2, 11),
('Pia', 'Newton', 3, 10),
('Sam', 'Hedrick', 1, 12),
('Daniela', 'Klimetschek', 2, 15),
('Geru', 'Atkins', 6, 4),
('Monica', 'Lomas', 2, 6),
('Zoe', 'Czekalla', 4, 5),
('Luisa', 'Melms', 2, 7),
('Elisabeth', 'Andres', 2, 8),
('Viola', 'Tietje', 2, 9);