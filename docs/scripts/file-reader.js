function readAllFiles(directory, callback) {
	let i = 0;
	let filename = directory + i + '.html';
	while (readFile(i, filename, callback)) {
		filename = directory + ++i + '.html';
	}
}

function readAllPosts() {
	readAllFiles('posts/', handleOutputHome);
}

function readFile(index, filename, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filename, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				if(callback) {
					callback(index, rawFile.responseText);
				}
			}
        }
    }
    rawFile.send();
	return rawFile.status === 200 || rawFile.status == 0;
}

function getPost() {
	var hash = parseInt(window.location.hash.substr(1));
	
	if(isNaN(hash)) {
		return;
	}
	
	readPost(hash);
}

function readPost(num) {
	readFile(num, 'posts/' + num, handleOutputPost);
}

function handleOutputPost(index, fileText) {
	var lines = fileText.split('\n');
	
	document.getElementById('title').innerHTML = lines[0];
	document.getElementById('date').innerHTML = lines[1];
	document.getElementById('img').src = lines[2];
	document.getElementById('imgRef').innerHTML = lines[3];
	document.getElementById('summary').innerHTML = lines[4];
	document.getElementById('content').innerHTML = lines.slice(5).join('<br />');
}

function handleOutputHome(index, fileText) {
	
	var lines = fileText.split('\n');
	
	var outputHtml =
	'<!-- Blog Post --> \n' +
    '    <div class="card mb-4"> \n' +
    '      <img class="card-img-top" src="' + lines[2] + '" alt="Card image cap"> \n' +
    '      <p class="card-footer"><i>' + lines[3] + '</i></p> \n' +
    '      <div class="card-body"> \n' +
    '        <h2 class="card-title">' + lines[0] + '</h2> \n' +
    '        <p class="card-text">' + lines[4].substr(0, 250) + '...</p> \n' +
    '        <a href="post#'+ index +'" class="btn btn-primary">Read More &rarr;</a> \n' +
    '      </div> \n' +
    '      <div class="card-footer text-muted"> \n' +
    '        Posted on ' + lines[1] +' by \n' +
    '        <a href="#">Emma Pilkington</a> \n' +
    '      </div> \n' +
    '    </div> \n';
	
	document.getElementById('posts').innerHTML += outputHtml;
}