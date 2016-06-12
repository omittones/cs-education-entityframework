alter table ZooKeepers alter column NoKeys int null 
go

alter table ZooKeepers add [Days] int null 
go

alter table ZooKeepers add [Type] varchar(max) null
go

create table ZooAdmin (Id int primary key, Handlebars varchar(max) null)
go

alter table ZooAdmin add constraint FK_Admin_Keeper foreign key (Id) references ZooKeepers(Id)
go