create table ZooKeepers (
	Id int primary key,
	NoKeys int not null
)
go

alter table ZooKeepers add constraint FK_Employees foreign key (Id) references Employees (Id)
go