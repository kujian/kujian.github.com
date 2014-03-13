<!doctype html>
<html lang="zh_CN">
<head>
	<meta charset="UTF-8">
	<title>jquery checked</title>
	<script src="../js/jquery.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(function(){
		//选中第二个radio
		$("input[type=radio]:eq(1)").attr("checked",true);
		// $('input[name=fruits]').get(1).checked = true;
		function checkedRadio(){
			// var item = $(":radio:checked");
			var item = $("input[type=radio][checked]");
			if(item.length>0){
				return val = $(":radio:checked").val();
			}
		}
		//输出选中的值
		$(":radio").change(function(){
			var fruits = checkedRadio();
			$("#tex").val("radio选中的值为："+fruits);


		}).change();
		//选中第二个option
		// $('#select_id')[0].selectedIndex = 1; 
		$("select option:eq(1)").attr("selected","selected");
		
		$("select").change(function(){
			var se = $("select option:selected").text();
			alert("select选中的值为："+se);
		}).change();
	})
	</script>
</head>
<body>

	<input type="radio" value="apple" name="fruits" checked/>
	<input type="radio" value="2" name="fruits"/>
	<input type="radio" value="pear" name="fruits"/>
	<input type="text" value="dd" id="tex"/>
	<select id="select_id">
  <option value="1">Flowers</option>
  <option value="2">Gardens</option>
  <option value="3">Trees</option>
</select>
</body>
</html>