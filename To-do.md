(1) add functionality to project backup reminder:
- is backup date fall on designated date ? blink "backup project to github" : display last backup date
- display a button "Backup done" upon blinking and delete the button upon backup to github completed

(2) create a new react app to save another set of data to mongodb and check the data format. Copy code from copilot

(3) research on eslint and install if necesary

4. ask AI I have a dependency array containing 2 variables inside a useEffect hook. How to check which variable has changed and then I can log approriate message to the console?

01 & 02 Feb To Do:
Test out the functionality of this dependency array, [nonUnderscoredIdDocsCount, redundantDocsCount]  if they help solve my issue by using 2 useEffect hook (one hook to find out the non-underscored Id count and redundant count, the other one to delete non-underscored Id docs and redundant docs)
- implement a detailed troubleshooting steps to see how the changes of the dependency variable can trigger re-render of useEffect hook