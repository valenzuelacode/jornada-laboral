
import { snakeCase, timestamp,integer,varchar,text,boolean,pgEnum } from 'drizzle-orm/pg-core';

export const timeRecordTypeEnum = pgEnum("timeRecordType", [
  "WORK_START",
  "WORK_END",
  "BREAK_START",
  "BREAK_END",
  "PERMISSION_START",
  "PERMISSION_END",
]);

export const timestamps = {
    createdAt: timestamp({withTimezone:true}),
    updatedAt: timestamp({withTimezone:true}),
    deletedAd: timestamp({withTimezone:true})
}

export const workplace = snakeCase.table("workplace",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    color:varchar().default("#3E87FF"),
    icon: varchar(),
    ...timestamps
})

export const group = snakeCase.table("group",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    color:varchar().default("#3E87FF"),
    icon:varchar(),
    ...timestamps
})

export const workplaceGroup = snakeCase.table("workplaceGroup",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    workplaceId:integer().references(()=>workplace.id).unique(),
    groupId:integer().references(()=>group.id).unique(),
    ...timestamps
})

export const user = snakeCase.table("user",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    ...timestamps
})

export const userWorkplaceGroup = snakeCase.table("userWorkplaceGroup",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().references(()=>user.id).unique(),
    workplaceGroupId:integer().references(()=>workplaceGroup.id).unique(),
    ...timestamps
})

export const rol = snakeCase.table("rol",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nombre: varchar().notNull(),
    color: varchar(),
    icon: varchar(),
    ...timestamps
})

export const permission = snakeCase.table("permission",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    description: text(),
    ...timestamps
})

export const rolUserPermission = snakeCase.table("rolUserPermission",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().references(()=>user.id).notNull().unique(),
    rolId: integer().references(()=>rol.id).notNull().unique(),
    permissionId:integer().references(()=>rol.id).notNull().unique(),
    ...timestamps
})

export const rolWorkplaceGroupPermission = snakeCase.table("rolWorkplaceGroupPermission",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    workplaceGroup:integer().references(()=>user.id).notNull().unique(),
    rolId: integer().references(()=>rol.id).notNull().unique(),
    permissionId:integer().references(()=>rol.id).notNull().unique(),
    ...timestamps
})

export const userRecordType = snakeCase.table("userRecordType",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    
})

export const userRecord = snakeCase.table("userRecord",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().references(()=>user.id).notNull(),
    start: timestamp({withTimezone:true}),
    end: timestamp({withTimezone:true}),
    active:boolean().default(true),
    ...timestamps

})