create table Birds (Id int identity(1,1) not null primary key,
	[Type] varchar(max) not null,
	ChickenCrestSize int null,
	HawkBeakSize int null
)
go

create table ChickenDetails (Id int not null,
	FeatherColor varchar(max),
	EggCount int null,
	[Type] varchar(max) not null
)
go

alter table ChickenDetails add constraint FK_Chicken_Birds foreign key (Id) references Birds(Id)
go

create table HawkDetails (
    Id int not null,
	SoaringHeight real not null,
	Prey nvarchar(max)
)
go

alter table HawkDetails add constraint FK_Hawk_Birds foreign key (Id) references Birds(Id)
go