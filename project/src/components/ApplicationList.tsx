import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Chip,
  Divider
} from '@mui/material';
import { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
  onApplicationSelect: (app: Application) => void;
  selectedApp?: Application;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running': return 'success';
    case 'stopped': return 'error';
    case 'pending': return 'warning';
    case 'error': return 'error';
    default: return 'default';
  }
};

const getAdminStateColor = (state: string) => {
  switch (state) {
    case 'enabled': return 'success';
    case 'disabled': return 'error';
    case 'maintenance': return 'warning';
    default: return 'default';
  }
};

export const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  onApplicationSelect,
  selectedApp
}) => {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
        Applications ({applications.length})
      </Typography>
      
      <List disablePadding>
        {applications.map((app, index) => (
          <React.Fragment key={app.id}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onApplicationSelect(app)}
                selected={selectedApp?.id === app.id}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    }
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {app.name}
                      </Typography>
                      <Chip 
                        label={app.env} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box display="flex" gap={1} mt={0.5}>
                      <Chip 
                        label={app.operationalstate} 
                        size="small" 
                        color={getStatusColor(app.operationalstate)}
                        sx={{ fontSize: '0.7rem' }}
                      />
                      <Chip 
                        label={app.adminstate} 
                        size="small" 
                        color={getAdminStateColor(app.adminstate)}
                        sx={{ fontSize: '0.7rem' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {app.instances} instances
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < applications.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};