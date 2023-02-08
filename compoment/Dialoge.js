import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';
import { CSVDownload, CSVLink } from 'react-csv';
import style from "./../compoment/style.module.css"






export default function DraggableDialog({open, setOpen,showLoader,response}) {
    
  
   
    const handleClose = () => {
      setOpen(false);
    };
    
    
  
    return (
      <div>
       
        <Dialog
          open={open}
          onClose={handleClose}          
          aria-labelledby="draggable-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle  id="draggable-dialog-title">
           Processing
          </DialogTitle>
          <DialogContent>
            {
              showLoader?<CircularProgress />:<DialogContentText>
                <CSVDownload data={response} target="_blank" />
             <CSVLink data={response}>
              <button  className={style.formboldbtn} style={{backgroundColor:'green'}}>
                 Download Resonse
              </button>
              </CSVLink>;
            </DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            
          </DialogActions>
        </Dialog>
      </div>
    );
  }