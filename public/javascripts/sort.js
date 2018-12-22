function sortStartDate() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('startDate');
	filter = input.value.toUpperCase();
	table = document.getElementById('tasks');
	tr = table.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[3];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

function sortEndDate() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('endDate');
	filter = input.value.toUpperCase();
	table = document.getElementById('tasks');
	tr = table.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[4];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

function sortStatus() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('status');
	filter = input.value.toUpperCase();
	table = document.getElementById('tasks');
	tr = table.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[5];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}

function sortProject() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById('project');
	filter = input.value.toUpperCase();
	table = document.getElementById('tasks');
	tr = table.getElementsByTagName('tr');
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName('td')[0];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	}
}
$(function() {
	$('.input-group.date').datepicker({
		format: 'mm/dd/yyyy'
	});
});