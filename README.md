# SudokuSolver

*Author: Marco Scanu*

## Objective
The ***Sudoku*** is a logic-based, combinatorial number-placement puzzle. In classic sudoku, the objective is to fill a 9×9 grid with some numbers so that each column, each row, and each of the nine 3×3 boxes that compose the grid contain all of the numbers from 1 to 9. The puzzle setter provides a partially completed grid, which for a well-posed puzzle has a *single solution*.

This is a ***node.js*** app which implements an ***ASP encoding*** that allows to solve every kind of *sudoku 9x9*. <br>
The ASP system used to perform the solution is ***clingo*** which is implemented, using the **clingo-wasm module**, into the app itself.

## Specifications

### Input command line
The solver takes as input two parameter through the command line:

	node solverSudoku.js <input file> <output file>

Where:
- "<input file>": it is the *.txt input file path*. Whithin it there is the sudoku to be solved.
- "<output file>": it is the *.txt output file path*. Whithin it will be written the solution of the sudoku taken in input.

### Input file example
This is the content of the input file:

	7 0 0 0 3 0 0 0 0
	0 9 0 2 0 4 7 0 0
	0 0 0 0 7 0 4 8 0
	0 5 0 6 0 0 0 7 0
	6 0 7 0 0 0 3 0 8
	0 4 0 0 0 3 0 5 0
	0 6 2 0 1 0 0 0 0
	0 0 3 4 0 9 0 1 0
	0 0 0 0 6 0 0 0 4

As you can see, is a grid 9x9 where each number is separated through a blank space.
- each "0" represents the missing numer to be placed in order to find the solution.
- the other numbers are the ones known at the beginning.

**N.B.** if the input file does not have this syntax, the command line will print an error message as a warning for the user that the sudoku given in input is not valid.

### Output file example
This is the content of the output file:

	7 2 4 1 3 8 9 6 5
	8 9 6 2 5 4 7 3 1
	1 3 5 9 7 6 4 8 2
	3 5 8 6 4 1 2 7 9
	6 1 7 5 9 2 3 4 8
	2 4 9 7 8 3 1 5 6
	4 6 2 8 1 7 5 9 3
	5 8 3 4 2 9 6 1 7
	9 7 1 3 6 5 8 2 4

It is a 9x9 grid that represent the only solution for the sudoku given in input.

## Directories
There are:
- *encoder*: it contains the ASP encoding.
- *input*: it contains the input files.
- *output*: it contains the output files.
- *solverSudoku.js*: file that implements the overall nodejs application.