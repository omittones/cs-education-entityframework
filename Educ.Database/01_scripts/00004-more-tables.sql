alter table Employees add Surrname nvarchar(max) null
go

create table EmployeesInformation
  (Id int primary key,
   DateOfBirth datetime null,
   [Password] varbinary(max) null)
go

alter table EmployeesInformation add constraint FK_Employee foreign key (Id) references Employees(Id)
go

alter table Animal alter column [Type] int null
go

create table Ferret 
    (Id int primary key,
	 FurValue real not null)
go

alter table Ferret add constraint FK_Animal foreign key (Id) references Animal(Id)
go