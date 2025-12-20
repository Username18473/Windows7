function saveNote() {
            const noteContent = document.getElementById('notepad').value;
            localStorage.setItem('savedNote', noteContent);
            alert('Note saved!');
        }

        function loadNote() {
            const savedNote = localStorage.getItem('savedNote');
            if (savedNote !== null) {
                document.getElementById('notepad').value = savedNote;
            } else {
                alert('No saved note found.');
            }
        }

        function clearNote() {
            if (confirm('Are you sure you want to clear the notepad?')) {
                document.getElementById('notepad').value = '';
            }
        }