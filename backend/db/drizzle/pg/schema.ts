
import { snakeCase, timestamp,integer,varchar,text,boolean,pgEnum,doublePrecision } from 'drizzle-orm/pg-core';

export const timeRecordTypeEnum = pgEnum("type", [
  "WORK_START",
  "WORK_END",
  "BREAK_START",
  "BREAK_END",
  "PERMISSION_START",
  "PERMISSION_END",
]);

export const calendarTypeEnum = pgEnum("type",[
    "WORKDAY",
    "HOLIDAYS",
    "LEAVE_OF_ABSENCE"
])

export const requestTypeEnum = pgEnum("type",[
    "SHIFT_CHANGE",
    "HOLYDAYS",
    "PERSONAL_LEAVE"
])

export const requestStateEnum = pgEnum("state",[
    "ACCEPTED",
    "REJECTED",
    "PENDING"
])

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
    active:boolean().default(true).notNull(),
    ...timestamps
})

export const group = snakeCase.table("group",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    color:varchar().default("#3E87FF"),
    icon:varchar(),
    active:boolean().default(true).notNull(),
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
    weeklyHours:doublePrecision(),
    maxExtraHours:doublePrecision(),
    active:boolean().default(true).notNull(),
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
    nombre: varchar().notNull().unique(),
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

export const userRolPermission = snakeCase.table("userRolPermission",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().references(()=>user.id).notNull().unique(),
    rolId: integer().references(()=>rol.id).notNull().unique(),
    permissionId:integer().references(()=>rol.id).notNull().unique(),
    ...timestamps
})

export const workplaceGroupRolPermission = snakeCase.table("rolWorkplaceGroupPermission",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    workplaceGroup:integer().references(()=>user.id).notNull().unique(),
    rolId: integer().references(()=>rol.id).notNull().unique(),
    permissionId:integer().references(()=>rol.id).notNull().unique(),
    ...timestamps
})

export const recordType = snakeCase.table("recordType",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: timeRecordTypeEnum()
})

export const userRecord = snakeCase.table("userRecord",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().references(()=>user.id).notNull(),
    recordTypeId:integer().references(()=>recordType.id).notNull(),
    start: timestamp({withTimezone:true}),
    end: timestamp({withTimezone:true}),
    active:boolean().default(true),
    ...timestamps
})


export const calendarType = snakeCase.table("calendarType",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    type:calendarTypeEnum()
})

export const calendar = snakeCase.table("calendar",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    userId:integer().notNull().references(()=>user.id),
    calendarTypeId:integer().references(()=>calendarType.id).notNull(),
    start:timestamp({withTimezone:true}).notNull(),
    end:timestamp({withTimezone:true}).notNull(),
    ...timestamps
})

export const requestType = snakeCase.table("requestType",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    type:requestTypeEnum()
})

export const userRequest = snakeCase.table("userRequest",{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    userRequestId:integer().references(()=>user.id).notNull(),
    userToChangeId:integer().references(()=>user.id),
    requestTypeId:integer().references(()=>requestType.id).notNull(),
    aditionalData:text(),
    state:
    ...timestamps
})