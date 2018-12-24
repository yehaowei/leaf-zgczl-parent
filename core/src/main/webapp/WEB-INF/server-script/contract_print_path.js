var con_print_path = {
	'con_print_path' : 'D:/IdeaProjects/leaf-zgczl/hls_attachment/',
	'tomcat_source':'leaf-zgc'
};
function print_insert_fnd_atm(type) {
	var guid_file_name_path = $ctx.get('/model/guid_file_name_path')
			.getChildren();
	var file_name = encodeURI(encodeURI($ctx.parameter.file_name,'utf-8')) + '.' + type;

	var file_path = con_print_path['con_print_path']
			+ guid_file_name_path[0].guid_file_name + '.' + type;
	if (type == 'pdf') {
		$bm('cont.CON500.con_sign_content_update').update({
			table_name : 'CON_CONTRACT_CONTENT_PDF',
			content_id : $ctx.parameter.content_id,
			file_name : file_name.toString(),
			file_path : file_path.toString()
		});
	} else {
		$bm('cont.CON500.con_sign_content_update').update({
			table_name : 'CON_CONTRACT_CONTENT',
			content_id : $ctx.parameter.content_id,
			file_name : file_name.toString(),
			file_path : file_path.toString()
		});
	}
}
