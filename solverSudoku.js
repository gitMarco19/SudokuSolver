const fs = require("fs");
const clingo = require("clingo-wasm");

const RIGHE = COL = 9;

const encoder = ".\\encoder\\encoderSudoku.asp";
const dataset = ".\\encoder\\sudoku.db";

if (process.argv.length != 4) {
	console.error("\nWrong input parameters!\n");
} else {
	try {
		fs.writeFileSync(dataset, "", err => {console.log(err);});
		let sudoku = fs.readFileSync(process.argv[2], "utf8").split("\n");

		if (!checkSudoku(sudoku)) {
			console.error("\nThe sudoku in input does not have a correct pattern!\n");
		} else {
			console.log("\nThe sudoku in input is OK!\n");

			preProcessing(sudoku);

			console.log("SOLVING...\n");

			solveSudoku();
		}

	} catch (err) {
		console.error(err);
	}
}

/**
 * This function checks if the sudoku taken in input is valid or not.
 * 
 * @param string that identifies the sudoku to be solved
 * 
 **/
function checkSudoku(sudoku) {
	if (sudoku.length != RIGHE)
		return false;

	for (let row = 0; row < sudoku.length; row++) {
		let temp = sudoku[row].replace("\r", "").split(" ");
		
		if (temp.length != COL)
			return false;


		for (let i = 0; i < temp.length; i++) {
			if (!(temp[i] >= "0" && temp[i] <= "9"))
				return false;
		}
	}

	return true;
}

/**
 * This function creates the file to be used as input for the solver clingo.
 * 
 * @param string that identifies the sudoku to be solved
 * 
 **/
function preProcessing(sudoku) {
	let counter = 0;
	for (let row = 0; row < sudoku.length; row++) {
		let temp = sudoku[row].replace("\r", "").split(" ");

		for (let col = 0; col < temp.length; col++) {
			let set;
			if (row < 3)
				set = selectSET(col, 1, 2, 3);
			if (row >= 3 && row < 6)
				set = selectSET(col, 4, 5, 6);
			if (row >= 6)
				set = selectSET(col, 7, 8, 9);

			if (temp[col] != "0") {
				const content = "present(" + temp[col] + "," 
									+ (row + 1) + "," + (col + 1) + "," + set + ").\n";
				fs.writeFileSync(dataset, content, { flag: 'a+' }, err => {console.log(err);});
			} else {
				counter++;
				const content = "position(" + (row + 1) + "," + (col + 1) + "," + set + ").\n";
				fs.writeFileSync(dataset, content, { flag: 'a+' }, err => {console.log(err);});
			}
		}
	}

	let content = "value(1..9).\n";
	fs.writeFileSync(dataset, content, { flag: 'a+' }, err => {console.log(err);});

	content = "#const tot = " + counter + ".\n";
	fs.writeFileSync(dataset, content, { flag: 'a+' }, err => {console.log(err);});

	function selectSET(col, set1, set2, set3) {
		let set;
		if (col < 3)
			set = set1;
		if (col >= 3 && col <= 5)
			set = set2;
		if (col > 5)
			set = set3;

		return set;
	}
}

/**
 * This function implements the solver clingo.
 * Through an ASP encoding, it is be able to solve any kind of sudoku taken in input.
 * 
 **/
function solveSudoku() {

	let problem = fs.readFileSync(dataset, 'utf8', err => {console.error(err)});

	problem = problem + fs.readFileSync(encoder, 'utf8', err => {console.error(err)});

	clingo
		.run(problem)
		.then((obj) => {
			let matrix = [];
			for(let row = 0; row < RIGHE; row++)
				matrix[row] = [];

			//console.log(matrix);

			
			let atomi = obj.Call[0].Witnesses[0].Value;
			atomi.forEach(atomo => {
				let index = atomo.indexOf("(");
				let temp = atomo.slice(index)
								.replace("(", "")
								.replace(")", "")
								.split(",");

				matrix[temp[1] - 1][temp[2] - 1] = temp[0];
			});

			fs.writeFileSync(process.argv[3], "", err => {console.log(err);});

			for(let row = 0; row < RIGHE; row++) {
				let stringa = matrix[row].toString().replaceAll(",", " ") + "\n";
				fs.writeFileSync(process.argv[3], stringa, { flag: 'a+' }, err => {console.log(err);});
			}

			console.log("SOLVED!\n");
		});
}