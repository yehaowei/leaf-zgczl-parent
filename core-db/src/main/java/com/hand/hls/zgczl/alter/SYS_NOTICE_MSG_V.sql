

	
ALTER TABLE "SYS_NOTICE_MSG" 
ADD ( "OPERATION_URL" VARCHAR2 ( 2000 ) );

ALTER TABLE "SYS_NOTICE_MSG" 
ADD ( "OPERATION_FLAG" VARCHAR2 ( 30 ) );


-- 添加字段operation_url，operation_flag
CREATE OR REPLACE FORCE VIEW "SYS_NOTICE_MSG_V" ("NOTICE_MSG_ID", "NOTICE_USER_ID", "MSG_TITLE", "MSG_BODY", "STATUS", "PRIORITY", "NOTICE_TYPE", "NOTICE_HTML", "NOTICE_URL", "START_DATE_ACTIVE", "END_DATE_ACTIVE", "ENABLED_FLAG", "SOURCE_TYPE", "SOURCE_ID", "CREATION_DATE", "CREATED_BY", "LAST_UPDATE_DATE", "LAST_UPDATED_BY", "OPERATION_URL", "OPERATION_FLAG") AS 
  select t1.notice_msg_id,
       t1.notice_user_id,
       t1.msg_title,
       t1.msg_body,
       t1.status,
       t1.priority,
       t1.notice_type,
       t1.notice_html,
       t1.notice_url,
       t1.start_date_active,
       t1.end_date_active,
       (case
         when (t1.start_date_active <= SYSDATE and
              (t1.end_date_active is null or SYSDATE <= t1.end_date_active)) then
          'Y'
         else
          'N'
       end) as enabled_flag,
       t1.source_type,
       t1.source_id,
       t1.creation_date,
       t1.created_by,
       t1.last_update_date,
       t1.last_updated_by,
       t1.operation_url,
       t1.operation_flag
  from sys_notice_msg t1