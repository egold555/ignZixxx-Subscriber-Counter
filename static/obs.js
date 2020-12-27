updateCounter();
var timerID = setInterval('updateCounter()', 5000);

function updateCounter() {
	fetch('http://localhost:3000/count')
		.then((res) => res.json())
		.then((out) => {
			setText(out.subscribers);
		})
		.catch((err) => {
			console.error(err);
			setText('Error');
		});
}

function setText(text) {
	document.getElementById('subCount').innerHTML = text;
}
