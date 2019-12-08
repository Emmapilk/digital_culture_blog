function readAllFiles(directory) {
	let i = 0;
	let filename = directory + i + '.html';
	while (readFile(filename, handleOutput)) {
		filename = directory + ++i + '.html';
	}
}

function readFile(file, callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				if(callback) {
					callback(rawFile.responseText);
				}
			}
        }
		return '';
    }
    rawFile.send(null);
	return rawFile.status === 200 || rawFile.status == 0;
}

function handleOutput(outputText) {
	//document.getElementById('').innerHTML = outputText;
}

function main()
{
	readAllFiles('./posts/');
}