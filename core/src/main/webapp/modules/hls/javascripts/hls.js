//$Version : 1.1
//$Author : DJ
if(!window.f_hls){
	function HLS (props) {
		this.context_path = props['context_path'];
	}
	HLS.prototype.winMask = function (win,desc) {
		if(Ext.isEmpty(desc))
		{
			desc = '正在提交...';
		}
		if(Ext.isEmpty(win))
		{
			Leaf.Masker.mask(Ext.getBody(),desc);
		}
		else
		{
			Leaf.Masker.mask(win.wrap,desc);
		}
	}
	HLS.prototype.winNoMask = function (win) {
		if(Ext.isEmpty(win))
		{
			Leaf.Masker.unmask(Ext.getBody());
		}
		else
		{
			Leaf.Masker.unmask(win.wrap);
		}
	}
	HLS.prototype.validateCode = function (code) {
		var reg=/^[_A-Za-z0-9]{1,30}$/;
	    if(reg.test(code))
	    {
	        return true;
	    }
	    return false;
	}
}