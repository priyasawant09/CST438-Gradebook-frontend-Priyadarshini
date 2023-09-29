import { Dialog, DialogActions, DialogContent ,Button} from '@mui/material';

import { SERVER_URL } from '../constants'; 
import React, { useState, useEffect } from 'react';

function EditAssignment({assignment , onClose,reload}) {

    const [edited_Assignment, setEditedAssignment] = useState({
        courseId: assignment ? assignment.courseId : '', 
        assignmentName: assignment ? assignment.assignmentName : '',
        dueDate: assignment ? assignment.dueDate : '', 
      });


    

    const [message, setMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(true);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAssignment({
          ...edited_Assignment,
          [name]: value,
        });
      };

    
      
    useEffect(() => {
      
      }, []);
      
    const handleSubmit = () => {
        setMessage('');
        console.log("Assignment.save");
        fetch(`${SERVER_URL}/assignment/${assignment.id}`, 
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(edited_Assignment),
        })
          .then((response) =>  {
            if (response) {
              setMessage('Assignment updated successfully');
              onClose(); 
              setOpenDialog(false);
              reload();
            } else {
              setMessage('Error updating assignment');
            }
          })
          .catch((error) => {
            console.error('Fetch error:', error);
            setMessage('Error updating assignment');
          });
      };

      

      
        

    return (
    <div>
      <Dialog open={openDialog} onClose={onClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Course ID:</label>
              <input
                type="text"
                name="courseId"
                value={edited_Assignment.courseId}
                onChange={handleChange}
                style={{
                  border: '1px solid #ccc', 
                  padding: '5px',
                  width: '100%', 
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Assignment Name:</label>
              <input
                type="text"
                name="assignmentName"
                value={edited_Assignment.assignmentName}
                onChange={handleChange}
                style={{
                  border: '1px solid #ccc', 
                  padding: '5px',
                  width: '100%', 
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ marginRight: '10px' }}>Due Date:</label>
              <input
                type="text"
                name="dueDate"
                value={edited_Assignment.dueDate}
                onChange={handleChange}
                style={{
                  border: '1px solid #ccc', 
                  padding: '5px',
                  width: '100%', 
                }}
              />
            </div>
          </form>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update Assignment
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      );
    
  
 
}

export default EditAssignment;