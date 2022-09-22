import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function FormDialog({open,children}) {
  

   return (
    <div>
<Dialog open={open} fullWidth  maxWidth="sm" >
        <DialogContent>
          {/* <DialogContentText>
            Subtitulo
          </DialogContentText> */}
                {children}
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </div>
  );
}
