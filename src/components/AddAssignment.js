import React, { useState , useEffect} from 'react';
import { SERVER_URL } from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';





function AddAssignment(props) { 




const [open, setOpen] = useState(false);
const [assignmentName, setAssignmentName] = useState('');
const [dueDate, setDueDate] = useState('');
const [courseId, setCourseId] = useState('');
const [message, setMessage] = useState('');


 
const handleCloseDialog = () => {
    setOpen(false);
  };
const handleOpenDialog = () => {
    setOpen(true);
  };


useEffect(() => {
 

},[]);

const handleSubmit = () => {
    setMessage('');
    const newAssignment = {
        assignmentName,
        dueDate,
        courseId, 
    };

    fetch(`${SERVER_URL}/assignment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAssignment),
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
                setAssignmentName('');
                setDueDate('');
                setCourseId('');
                setMessage('Assignment created successfully.');
                handleCloseDialog(); // Close the dialog
                props.reload();
            
        })
        .catch((error) => {
            setMessage('Error creating assignment: ' + error);

        });
};





return (
  <div>
  <Button id="add-button2" variant='outlined' color='primary' onClick={handleOpenDialog}>Add Assignment</Button>
  <Dialog open={open} onClose={handleCloseDialog}>
    <DialogTitle>AddAssignment</DialogTitle>
    <DialogContent>
    
      <TextField
          label="Assignment Name"
          id='assignment-name'
          variant="outlined"
          fullWidth
          name="assignmentName"
          onChange={(e) => setAssignmentName(e.target.value)}
          style={{ width: '100%' }}>
      </TextField>
      <TextField
          label="Course ID"
          id='assignment-id'
          variant="outlined"
          name='courseId'
          onChange={(e) => setCourseId(e.target.value)}
          style={{ width: '100%' }}
         >
      </TextField>
      <TextField
          variant="outlined"
          id='assignment-date'
          fullWidth
          name="dueDate"
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: '100%' }}>
      </TextField>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color='primary'>
        Cancel
      </Button>
      <Button id="submit-button" onClick={handleSubmit} color='primary' type='submit'>
        Submit
      </Button>
    </DialogActions>
    </Dialog>
    {message && <p id="message-id">{message}</p>}
</div>
);

}

export default AddAssignment;

