$(function() {

	$('#login-form-link').click(function(e) {
		$('#login-form').delay(100).fadeIn(100);
 		$('#register-form').fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$('#register-form').delay(100).fadeIn(100);
 		$('#login-form').fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('.input-group.date').datepicker({
		format: 'yyyy/mm/dd'
	});
});

$('.collapse').collapse()

function validateNameProject(){
	const projectNewName = document.getElementById('createFormName').value;
	const projectUpdateName = document.getElementById('updateFormName').value;
	const pattern = /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?@]/g;
	let messageNew, messageUpdate;

	if(pattern.test(projectNewName)) {
		messageNew = 'Only Latin characters, Numbers, _';
		document.getElementById('validNewName').innerHTML = messageNew;
		return false;
	}else messageNew = '';

	if(pattern.test(projectUpdateName)) {
		messageUpdate = 'Only Latin characters, Numbers, _';
		document.getElementById('validUpdateName').innerHTML = messageUpdate;
		return false;
	}else messageUpdate = '';

}

function validateDescriptionProject(){
	const projectNewDescription = document.getElementById('createFormDescription').value;
	const projectUpdateDescription = document.getElementById('updateFormDescription').value;
	const pattern =	/[~`#$%\^&*+=\-\[\]\\';/{}|\\":<>@]/g;
	let messageNew, messageUpdate;

	if(pattern.test(projectNewDescription)){
		messageNew = 'Only Latin characters, Numbers, _, !, ?, (), ,, .';
		document.getElementById('validNewDescription').innerHTML = messageNew;
		return false;
	} else messageNew = '';

	if(pattern.test(projectUpdateDescription)){
		messageUpdate = 'Only Latin characters, Numbers, _, !, ?, (), ,, .';
		document.getElementById('validUpdateDescription').innerHTML = messageUpdate;
		return false;
	} else messageUpdate = '';
}

function validateNameTask(){
	const taskNewName = document.getElementById('createName').value;
	const taskUpdateName = document.getElementById('updateName').value;
	const pattern = /[~`!#$%\^&*+=\-\[\]\\';,/{}()|\\":<>\?@]/g;
	let messageNew, messageUpdate;

	if(pattern.test(taskNewName)) {
		messageNew = 'Only Latin characters, Numbers, _'; 
		document.getElementById('validNewName').innerHTML = messageNew;
		return false;
	}else messageNew = '';

	if(pattern.test(taskUpdateName)) {
		messageUpdate = 'Only Latin characters, Numbers, _'; 
		document.getElementById('validUpdateName').innerHTML = messageUpdate;
		return false;
	}else messageUpdate = '';
}

function validateDescriptionTask(){
	const taskNewDescription = document.getElementById('createDescription').value;
	const taskUpdateDescription = document.getElementById('updateDescription').value;
	const pattern =	/[~`#$%\^&*+=\-\[\]\\';/{}|\\":<>@]/g;
	let messageNew, messageUpdate;

	if(pattern.test(taskNewDescription)){
		messageNew = 'Only Latin characters, Numbers, _, !, ?, (), ,, .'; 
		document.getElementById('validNewDescription').innerHTML = messageNew;
		return false;
	} else messageNew = '';

	if(pattern.test(taskUpdateDescription)){
		messageUpdate = 'Only Latin characters, Numbers, _, !, ?, (), ,, .'; 
		document.getElementById('validUpdateDescription').innerHTML = messageUpdate;
		return false;
	} else messageUpdate = '';
}
