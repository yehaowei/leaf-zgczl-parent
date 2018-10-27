
/*--------------------------------------------------------- SYS_LANG_B  start-------------------------------------------------------------------*/
-- ----------------------------
-- Table structure for SYS_LANG_B
-- ----------------------------
CREATE TABLE "SYS_LANG_B" (
  "LANG_CODE" VARCHAR2(10 BYTE) NOT NULL ,
  "BASE_LANG" VARCHAR2(10 BYTE) ,
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
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;
COMMENT ON COLUMN "SYS_LANG_B"."LANG_CODE" IS '表ID，主键，供其他表做外键';
COMMENT ON COLUMN "SYS_LANG_B"."BASE_LANG" IS '基语言';
COMMENT ON COLUMN "SYS_LANG_B"."DESCRIPTION" IS '描述';

-- ----------------------------
-- Records of SYS_LANG_B
-- ----------------------------
INSERT INTO "SYS_LANG_B" VALUES ('zh_CN', 'zh_CN', '简体中文', '1', '-1', '-1', '-1', TO_TIMESTAMP('2018-05-18 10:26:56.148000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), '-1', TO_TIMESTAMP('2018-05-18 10:26:56.148000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), '-1');
INSERT INTO "SYS_LANG_B" VALUES ('en_GB', 'zh_CN', 'English', '1', '-1', '-1', '-1', TO_TIMESTAMP('2018-05-18 10:26:56.225000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), '-1', TO_TIMESTAMP('2018-05-18 10:26:56.225000', 'SYYYY-MM-DD HH24:MI:SS:FF6'), '-1');

-- ----------------------------
-- Primary Key structure for table SYS_LANG_B
-- ----------------------------
ALTER TABLE "SYS_LANG_B" ADD CONSTRAINT "SYS_LANG_B_PK" PRIMARY KEY ("LANG_CODE");

-- ----------------------------
-- Checks structure for table SYS_LANG_B
-- ----------------------------
ALTER TABLE "SYS_LANG_B" ADD CONSTRAINT "SYS_C00141899" CHECK ("LANG_CODE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

/*--------------------------------------------------------- SYS_LANG_B  end-------------------------------------------------------------------*/