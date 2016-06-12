alter table Animal drop constraint [FK_dbo.Animal_dbo.Employees_TrainerEmployeeId]
go

alter table Animal drop column PrimateName
alter table Animal drop column TrainerEmployeeId
go

alter table PrimateSpecifics add PrimateName nvarchar(max)
alter table PrimateSpecifics add PrimateTrainerEmployeeId int not null
go

alter table PrimateSpecifics add constraint FK_Primate_Employee foreign key (PrimateTrainerEmployeeId) references Employees (Id)
go

create table Marten (Id int primary key, FurColor nvarchar(max) not null)
go

alter table Marten add constraint FK_Marten_Ferret foreign key (Id) references Ferret(Id)
go