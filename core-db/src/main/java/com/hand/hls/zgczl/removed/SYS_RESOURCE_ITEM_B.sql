-- ----------------------------
-- Table structure for SYS_RESOURCE_ITEM_B
-- ----------------------------
CREATE TABLE "SYS_RESOURCE_ITEM_B" (
  "RESOURCE_ITEM_ID" NUMBER(38) NOT NULL ,
  "OWNER_RESOURCE_ID" NUMBER(38) ,
  "TARGET_RESOURCE_ID" NUMBER(38) ,
  "ITEM_ID" VARCHAR2(50 BYTE) ,
  "ITEM_NAME" VARCHAR2(50 BYTE) ,
  "DESCRIPTION" VARCHAR2(240 BYTE) ,
  "ITEM_TYPE" VARCHAR2(10 BYTE) ,
  "OBJECT_VERSION_NUMBER" NUMBER(38) DEFAULT 1 ,
  "REQUEST_ID" NUMBER(38) DEFAULT -1 ,
  "PROGRAM_ID" NUMBER(38) DEFAULT -1 ,
  "CREATED_BY" NUMBER(38) DEFAULT -1 ,
  "CREATION_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATED_BY" NUMBER(38) DEFAULT -1 ,
  "LAST_UPDATE_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATE_LOGIN" NUMBER(38) DEFAULT -1 ,
  "ATTRIBUTE_CATEGORY" VARCHAR2(30 BYTE) ,
  "ATTRIBUTE1" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE2" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE3" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE4" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE5" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE6" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE7" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE8" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE9" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE10" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE11" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE12" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE13" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE14" VARCHAR2(240 BYTE) ,
  "ATTRIBUTE15" VARCHAR2(240 BYTE) 
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."RESOURCE_ITEM_ID" IS '表ID，主键';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."OWNER_RESOURCE_ID" IS '功能资源ID';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."TARGET_RESOURCE_ID" IS '目标资源ID';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."ITEM_ID" IS 'HTML中控件ID';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."ITEM_NAME" IS '控件名称';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."DESCRIPTION" IS '描述';
COMMENT ON COLUMN "SYS_RESOURCE_ITEM_B"."ITEM_TYPE" IS '控件类型';

-- ----------------------------
-- Primary Key structure for table SYS_RESOURCE_ITEM_B
-- ----------------------------
ALTER TABLE "SYS_RESOURCE_ITEM_B" ADD CONSTRAINT "SYS_RESOURCE_ITEM_B_PK" PRIMARY KEY ("RESOURCE_ITEM_ID");

-- ----------------------------
-- Uniques structure for table SYS_RESOURCE_ITEM_B
-- ----------------------------
ALTER TABLE "SYS_RESOURCE_ITEM_B" ADD CONSTRAINT "SYS_RESOURCE_ITEM_B_U1" UNIQUE ("ITEM_ID", "OWNER_RESOURCE_ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Checks structure for table SYS_RESOURCE_ITEM_B
-- ----------------------------
ALTER TABLE "SYS_RESOURCE_ITEM_B" ADD CONSTRAINT "SYS_C00141909" CHECK ("RESOURCE_ITEM_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table SYS_RESOURCE_ITEM_B
-- ----------------------------
CREATE INDEX "SYS_RESOURCE_ITEM_B_N1"
  ON "SYS_RESOURCE_ITEM_B" ("OWNER_RESOURCE_ID" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
);


CREATE SEQUENCE  "SYS_RESOURCE_ITEM_B_S"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 10001 CACHE 20 NOORDER  NOCYCLE
