exec sp_rename 'ApeSpecifics', 'PrimateSpecifics'
go

exec sp_rename 'Animal.ApeName', 'PrimateName'
go

alter table PrimateSpecifics alter column ApeWeight float null
alter table PrimateSpecifics add IsChimp bit not null
alter table PrimateSpecifics add NoChimpRelatives int null
alter table PrimateSpecifics add ChimpFurColor int null
go

drop table Chimpanzee
go