ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("LANG" VARCHAR2(10) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS"
 ADD ("OBJECT_VERSION_NUMBER" NUMBER(20) DEFAULT '1' );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ( "REQUEST_ID" NUMBER ( 20 ) DEFAULT '-1' );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("PROGRAM_ID" NUMBER(20) DEFAULT '-1' );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("LAST_UPDATE_LOGIN" NUMBER(20) DEFAULT '-1' );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE_CATEGORY" VARCHAR2(30) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE1" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE2" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE3" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE4" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE5" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE6" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE7" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE8" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE9" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE10" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE11" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE12" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE13" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE14" VARCHAR2(240) );

ALTER TABLE "ZGC_PROD"."SYS_PROMPTS" 
ADD ("ATTRIBUTE15" VARCHAR2(240) );

-- 删除约束

alter table SYS_PROMPTS modify PROMPT_CODE null;
alter table SYS_PROMPTS modify LANGUAGE null;
alter table SYS_PROMPTS modify DESCRIPTION null;
alter table SYS_PROMPTS modify LAST_UPDATE_DATE null;
alter table SYS_PROMPTS modify LAST_UPDATED_BY null;
alter table SYS_PROMPTS modify CREATION_DATE null;
alter table SYS_PROMPTS modify CREATED_BY null;


