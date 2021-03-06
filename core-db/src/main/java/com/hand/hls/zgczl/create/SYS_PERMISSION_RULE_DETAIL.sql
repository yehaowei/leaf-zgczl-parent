CREATE TABLE "SYS_PERMISSION_RULE_DETAIL" (
  "DETAIL_ID" NUMBER(38) NOT NULL ,
  "RULE_ID" NUMBER(38) NOT NULL ,
  "PERMISSION_FIELD_SQL_VALUE" VARCHAR2(2000 BYTE) ,
  "OBJECT_VERSION_NUMBER" NUMBER(38) DEFAULT 1 ,
  "REQUEST_ID" NUMBER(38) DEFAULT -1 ,
  "PROGRAM_ID" NUMBER(38) DEFAULT -1 ,
  "CREATED_BY" NUMBER(38) DEFAULT -1 ,
  "CREATION_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATED_BY" NUMBER(38) DEFAULT -1 ,
  "LAST_UPDATE_DATE" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP ,
  "LAST_UPDATE_LOGIN" NUMBER(38) DEFAULT -1 ,
  "PERMISSION_FIELD_VALUE" VARCHAR2(200 BYTE) 
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
COMMENT ON COLUMN "SYS_PERMISSION_RULE_DETAIL"."DETAIL_ID" IS 'PK';
COMMENT ON COLUMN "SYS_PERMISSION_RULE_DETAIL"."RULE_ID" IS 'MANGE CODE';
COMMENT ON COLUMN "SYS_PERMISSION_RULE_DETAIL"."PERMISSION_FIELD_SQL_VALUE" IS '安全性sql字段值';
COMMENT ON TABLE "SYS_PERMISSION_RULE_DETAIL" IS '规则屏蔽管理表';

-- ----------------------------
-- Primary Key structure for table SYS_PERMISSION_RULE_DETAIL
-- ----------------------------
ALTER TABLE "SYS_PERMISSION_RULE_DETAIL" ADD CONSTRAINT "SYS_C00143831" PRIMARY KEY ("DETAIL_ID");
