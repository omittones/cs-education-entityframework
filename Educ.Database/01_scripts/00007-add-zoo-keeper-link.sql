alter table ZooKeepers add ZooId int null
go

alter table ZooKeepers add constraint FK_Keeper_Zoo foreign key (ZooId) references Zoos(Id)
go