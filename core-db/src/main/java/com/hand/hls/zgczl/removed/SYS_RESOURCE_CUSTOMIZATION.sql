-- ----------------------------
-- Table structure for SYS_RESOURCE_CUSTOMIZATION
-- ----------------------------
CREATE TABLE "SYS_RESOURCE_CUSTOMIZATION" (
  "RESOURCE_CUSTOMIZATION_ID" NUMBER(38) NOT NULL ,
  "RESOURCE_ID" NUMBER(38) NOT NULL ,
  "URL" VARCHAR2(255 BYTE) NOT NULL ,
  "SEQUENCE" NUMBER(10) NOT NULL ,
  "ENABLE_FLAG" VARCHAR2(1 BYTE) DEFAULT 'N'  NOT NULL ,
  "DESCRIPTION" VARCHAR2(240 BYTE) ,
  "OBJECT_VERSION_NUMBER" NUMBER(38) DEFAULT 1 ,
  "REQUEST_ID" NUMBER(38) DEFAULT -1 ,
  "PROGRAM_ID" NUMBER(38) DEFAULT -1 ,
  "CREATED_BY" NUMBER(38) DEFAULT -1 ,
  "CREATION_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATED_BY" NUMBER(38) DEFAULT -1 ,
  "LAST_UPDATE_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATE_LOGIN" NUMBER(38) DEFAULT -1 
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
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."RESOURCE_CUSTOMIZATION_ID" IS '表ID，主键，供其他表做外键';
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."RESOURCE_ID" IS '外键，资源ID';
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."URL" IS 'URL';
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."SEQUENCE" IS '序列号';
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."ENABLE_FLAG" IS '是否激活';
COMMENT ON COLUMN "SYS_RESOURCE_CUSTOMIZATION"."DESCRIPTION" IS '描述';

-- ----------------------------
-- Primary Key structure for table SYS_RESOURCE_CUSTOMIZATION
-- ----------------------------
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_RESOURCE_CUSTOMIZATION_PK" PRIMARY KEY ("RESOURCE_CUSTOMIZATION_ID");

-- ----------------------------
-- Checks structure for table SYS_RESOURCE_CUSTOMIZATION
-- ----------------------------
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_C00142039" CHECK ("RESOURCE_CUSTOMIZATION_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_C00142040" CHECK ("RESOURCE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_C00142041" CHECK ("URL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_C00142042" CHECK ("SEQUENCE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "SYS_RESOURCE_CUSTOMIZATION" ADD CONSTRAINT "SYS_C00142043" CHECK ("ENABLE_FLAG" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Indexes structure for table SYS_RESOURCE_CUSTOMIZATION
-- ----------------------------
CREATE INDEX "SYS_RESOURCE_CUSTOMIZATION_N1"
  ON "SYS_RESOURCE_CUSTOMIZATION" ("RESOURCE_ID" ASC)
  LOGGING
  VISIBLE
PCTFREE 10
INITRANS 2
STORAGE (
  BUFFER_POOL DEFAULT
);
CREATE SEQUENCE  "SYS_RESOURCE_CUSTOMIZATION_S"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 10001 CACHE 20 NOORDER  NOCYCLE