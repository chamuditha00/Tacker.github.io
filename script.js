   // Stopwatch functionality
   const stopwatchContainers = document.querySelectorAll('.stopwatch-container');
   let activeContainer = null;
   const errorMessage = document.getElementById('errorMessage');

   stopwatchContainers.forEach((container, index) => {
     const stopwatchElem = container.querySelector('.stopwatch');
     const startBtn = container.querySelector('.startBtn');
     const noteInput = container.querySelector('.noteInput');
     const saveBtn = container.querySelector('.saveBtn');
     const usernameLabel = container.querySelector(`#usernameLabel${index + 1}`);

     let startTime;
     let timerInterval;

     function startTimer() {
       startTime = Date.now();
       timerInterval = setInterval(updateTimer, 1000);
     }

     function stopTimer() {
       clearInterval(timerInterval);
     }

     function updateTimer() {
       const elapsedTime = Date.now() - startTime;
       const formattedTime = formatTime(elapsedTime);
       stopwatchElem.textContent = formattedTime;
     }

     function formatTime(time) {
       const seconds = Math.floor(time / 1000) % 60;
       const minutes = Math.floor(time / 1000 / 60) % 60;
       const hours = Math.floor(time / 1000 / 60 / 60);

       return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
     }

     function pad(num) {
       return num.toString().padStart(2, '0');
     }

     function saveNote() {
       if (activeContainer !== container) {
         // Show error message if another stopwatch is already running
         errorMessage.textContent = 'Error: Another stopwatch is already running.';
         return;
       }
   

       if (timerInterval) {
        

        
         const note = noteInput.value;

         if (note === '') {
           // Show error message if note is empty
           alert('Error: Note cannot be empty.');
           return;
         }else{
            stopTimer();
            const username = usernameLabel.textContent;
            const date = new Date().toLocaleDateString();
            const stopwatchTime = stopwatchElem.textContent;

         // Create a new table row
         const newRow = document.createElement('tr');

         // Create cells for username, date, stopwatch time, and note
         const usernameCell = document.createElement('td');
         usernameCell.textContent = username;

         const dateCell = document.createElement('td');
         dateCell.textContent = date;

         const timeCell = document.createElement('td');
         timeCell.textContent = stopwatchTime;

         const noteCell = document.createElement('td');
         noteCell.textContent = note;

         // Append cells to the new row
         newRow.appendChild(usernameCell);
         newRow.appendChild(dateCell);
         newRow.appendChild(timeCell);
         newRow.appendChild(noteCell);

         // Append the new row to the table
         document.getElementById('notesTable').getElementsByTagName('tbody')[0].appendChild(newRow);

         // Clear the input fields
         noteInput.value = '';

         // Allow another user to start their stopwatch
         activeContainer = null;
         errorMessage.textContent = ''; 
         }// Clear any previous error message
       } else {
         startTimer();
       }
     }

     startBtn.addEventListener('click', () => {
       if (activeContainer === null) {
         activeContainer = container;
         errorMessage.textContent = ''; // Clear any previous error message
         startTimer();
       } else {
         // Show error message if another stopwatch is already running
         alert('Error: Another stopwatch is already running.');;
       }
     });

     saveBtn.addEventListener('click', saveNote);
   });