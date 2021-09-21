%This rule assigns a number to a given position
{assigned(NUM, ROW, COL, SET)} :- value(NUM), position(ROW, COL, SET).

%It must not be true that in a row there are two equal numbers
:- assigned(NUM1, ROW, _, _), present(NUM2, ROW, _, _), NUM1 == NUM2.

%It must not be true that in a column there are two equal numbers
:- assigned(NUM1, _, COL, _), present(NUM2, _, COL, _), NUM1 == NUM2.

%It must not be true that in a box there are two equal numbers
:- assigned(NUM1, _, _, SET), present(NUM2, _, _, SET), NUM1 == NUM2.

%It must not be true that a same number in a row is in two different columns
:- assigned(NUM, ROW, COL1, _), assigned(NUM, ROW, COL2, _), COL1 != COL2.

%It must not be true that a same number in a column is in two different rows
:- assigned(NUM, ROW1, COL, _), assigned(NUM, ROW2, COL, _), ROW1 != ROW2.

%It must not be true that a same number in a box is in two different rows and columns
:- assigned(NUM, ROW1, COL1, SET), assigned(NUM, ROW2, COL2, SET), ROW1 != ROW2, COL1 != COL2.

%This rule computes the number of unassigned positions in the grid
unassignedPos(N) :- N = tot - M, M = #count {ROW, COL, SET : assigned(_, ROW, COL, SET)}.

%This constraint states that the number of unassigned positions must be zero
:- unassignedPos(N), N != 0.

%Atoms we want to show in the output
#show present/4.
#show assigned/4.
