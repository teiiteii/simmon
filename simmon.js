$(document).ready( function()
{

	$(".message:not(:animated)").fadeOut(0);

})
let user0Num = 0
let user1Num = 0
let unitName = "勝中"
let unitUserNameAdd = "の勝ち"
function initUserNum(){
	user0Num = 0
	user1Num = 0
	updateInfo()
}
function updateInfo(){
	let user0Name = $("#users li:eq(0)").text() + unitUserNameAdd
	user0Name += (user0Num > 0) ? "("+ user0Num + unitName + ")": ""
	$("#user0").text(user0Name)
	let user1Name = $("#users li:eq(1)").text() + unitUserNameAdd
	user1Name += (user1Num > 0) ? "("+ user1Num + unitName + ")": ""
	$("#user1").text(user1Name)
	toClipboard()
}
function addBothUserNum(){
    addUserNum(1)
	addUserNum(0)
}
function addUserNum(num){
	if(num == 0){
		user0Num += 1
	}else{
		user1Num += 1
	}

	if(user0Num >= 2) {
		const user0 = $("#users li:eq(0)")
			$("#users").append($(user0))
			user0Num = user1Num
			user1Num = 0
	}

	if(user1Num >= 2) {
		const user1 = $("#users li:eq(1)")
			$("#users").append($(user1))
			user1Num = 0
	}
	updateInfo()
}

function getUser(userName){
	let ans = null
	$(".user").each((index, element) => {
		if($(element).text() == userName) {
			ans = $(element)
			return false
		}

})
	return ans
}
function removeUserDialog(userName){
	const result = confirm(userName + 'を消しますか？');
  if(result) {
	 removeUser(userName)
	 updateInfo()
  }
}
function removeUser(userName){
	if(getUserNames().indexOf(userName) == 0) {
		user0Num = user1Num
		user1Num = 0
	}else if(getUserNames().indexOf(userName) == 1){
		user1Num = 0
	}
	const user = getUser(userName)
	$(user).remove()
}

function getUserNames(){
	 const ans = []
		$(".user").each((index, element) => {
			ans.push($(element).text())
		});
		return ans
}
function newUser(userName){
	const li = $("<li>", {class:"user",draggable:"true", ondragstart:"dragStarted(event)", ondragover:"draggingOver(event)", ondrop:"dropped(event)", onclick:"removeUserDialog('" + userName + "')"})
	li.text(userName)
	return li
}
function addRow(){
	const userName = $("#txt_user_add").val()
	if(userName == ""){
		return
	}

  if(getUserNames().indexOf(userName) >= 0) {
  	alert("追加済みのユーザーです")
  	return
  }

	const li = newUser(userName)

	$("#users").append(li)
  updateInfo()
	$("#txt_user_add").val("")
	console.log(userName)
}

function changeRule(){
	 const rule = $("#rule").val();
	 if(rule == "rule0"){
		 unitName = "勝中"
  	 unitUserNameAdd = "の勝ち"
		 $(".rule1_conf").addClass("d-none")
		 $(".rule0_conf").attr('disabled',false)
	 }else if(rule == "rule1"){
		 unitName = "試合中"
  	 unitUserNameAdd = ""
		 $(".rule1_conf").removeClass("d-none")
		 $(".rule0_conf").attr('disabled',true)

	 }
	 updateInfo()
}

function toClipboard(){
	let txt = ""
	const nums = {1:"①",
	2:"②",
	3:"③",
	4:"④",
	5:"⑤",
	6:"⑥",
	7:"⑦",
	8:"⑧",
	9:"⑨",
	10:"⑩",
	11:"⑪",
	12:"⑫",
	13:"⑬",
	14:"⑭",
	15:"⑮",
	16:"⑯",
	17:"⑰",
	18:"⑱",
	19:"⑲",
	20:"⑳",
	21:"㉑",
	22:"㉒",
	23:"㉓",
	24:"㉔"
}
	$(".user").each((index, element) => {
		if(index > 5) {
			return true
		}
		let line = ""
		line += (index <= 1) ? "主：" : nums[index - 1]
		line += $(element).text()
		txt += line + "\n"

	});
	let len = $(".user").length
	const maxEmpty = 6
	for(;len < maxEmpty;len++){
		if(len == 0 || len == 1){
			txt += "主：\n"
	  }else{
	  	txt += nums[len - 1] + "\n"
	  }
	}

$("#copyTarget").val(txt)
	// コピー対象をJavaScript上で変数として定義する
	var copyTarget = document.getElementById("copyTarget");
	// コピー対象のテキストを選択する
	copyTarget.select();

	// 選択しているテキストをクリップボードにコピーする
	document.execCommand("Copy");
	$(".message:not(:animated)").fadeIn(0,function(){
	    $(this).delay(1000).fadeOut("slow");
	  });

}

	var source;

	function dragStarted(evt) {
		source = evt.target;
		evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
		evt.dataTransfer.effectAllowed = "move";
	}

	function draggingOver(evt) {
		evt.preventDefault();
		evt.dataTransfer.dropEffect = "move";
	}

	function dropped(evt) {
		const userNameDrag = $(source).text()
        , userNameDragIndex = getUserNames().indexOf(userNameDrag)
		    , userNameDrop = $(evt.toElement).text()
        , userNameDropIndex = getUserNames().indexOf(userNameDrop)
		if(userNameDragIndex + userNameDropIndex == 1){
			const tmp = user0Num
			user0Num = user1Num
			user1Num = tmp
		}else if(userNameDragIndex == 0){
			user0Num = 0
		}else if(userNameDragIndex == 1){
			user1Num = 0
		}else if(userNameDragIndex >=2){
			if(userNameDropIndex == 0){
				user0Num = 0
			}else if(userNameDropIndex == 1){
			user1Num = 0
	  	}
	  }

		evt.preventDefault();
		evt.stopPropagation();
		source.innerHTML = evt.target.innerHTML;
		evt.target.innerHTML = evt.dataTransfer.getData("text/plain");

		updateInfo()
	}
