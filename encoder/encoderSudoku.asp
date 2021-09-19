{assigned(NUM, ROW, COL, SET)} :- value(NUM), position(ROW, COL, SET).

:- assigned(NUM1, ROW, _, _), present(NUM2, ROW, _, _), NUM1 == NUM2.

:- assigned(NUM1, _, COL, _), present(NUM2, _, COL, _), NUM1 == NUM2.

:- assigned(NUM1, _, _, SET), present(NUM2, _, _, SET), NUM1 == NUM2.


:- assigned(NUM, ROW, COL1, _), assigned(NUM, ROW, COL2, _), COL1 != COL2.

:- assigned(NUM, ROW1, COL, _), assigned(NUM, ROW2, COL, _), ROW1 != ROW2.

:- assigned(NUM, ROW1, COL1, SET), assigned(NUM, ROW2, COL2, SET), ROW1 != ROW2, COL1 != COL2.


unassignedPos(N) :- N = tot - M, M = #count {ROW, COL, SET : assigned(_, ROW, COL, SET)}.

:- unassignedPos(N), N != 0.

#show present/4.
#show assigned/4.