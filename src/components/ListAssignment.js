import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';
import AddAssignment from './AddAssignment';
import EditAssignment from './EditAssignment';






function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
   
  },[]);
 


  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }

  const handleDelete = (assignment_id) => {
    fetch(`${SERVER_URL}/assignment/${assignment_id}?force=true`, {
      method: 'DELETE',
    })
      .then((response) =>  {
        if (response.ok) {
          console.log('Assignment deleted successfully');
          fetchAssignments(); // Fetch assignments again to update the list
        } else {
          console.error('Error deleting assignment:', response.error);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };
  
  
  

  
  const openEditDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setIsEditDialogOpen(true);
  };
  

  const closeEditDialog = () => {
    setSelectedAssignment(null);
    setIsEditDialogOpen(false);
  };

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsAddDialogOpen(false);
  };
 

  
  
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                      <Link to={`/gradeAssignment/${row.id}`}>
                        Grade</Link>
                      </td>
                      <td><button onClick={() => openEditDialog(row)}>Edit</button></td>
                <td><button onClick={() => handleDelete(assignments[idx].id)}>Delete</button></td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => openAddDialog()}>Add</button>
          </div>
          
          {isEditDialogOpen && (
        <EditAssignment assignment={selectedAssignment} onClose={closeEditDialog} reload={fetchAssignments} />
          )}

      {isAddDialogOpen && (
        <AddAssignment  reload={fetchAssignments}onClose={closeAddDialog}/>
      )}
      </div>
    );
}  

export default ListAssignment;