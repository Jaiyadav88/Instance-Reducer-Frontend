import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Chip,
  IconButton,
  Toolbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Download as DownloadIcon, 
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { Application } from '../types';

interface ApplicationTableProps {
  application: Application;
}

interface TableRow {
  id: string;
  env: string;
  instances: number;
  last_updated: string;
  memory_usage: string;
  operationalstate: string;
  adminstate: string;
  glb_routes: string[];
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

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ application }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [scaleDialogOpen, setScaleDialogOpen] = useState(false);
  const [scaleType, setScaleType] = useState<'automatic' | 'manual'>('automatic');
  const [scaleValue, setScaleValue] = useState('');

  // Create mock table data - in real app this would come from API
  const tableData: TableRow[] = [
    {
      id: '1',
      env: application.env,
      instances: application.instances,
      last_updated: application.last_updated,
      memory_usage: application.memory_usage,
      operationalstate: application.operationalstate,
      adminstate: application.adminstate,
      glb_routes: application.glb_routes
    }
  ];

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(tableData.map(row => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleScale = (type: 'automatic' | 'manual') => {
    setScaleType(type);
    setScaleDialogOpen(true);
  };

  const handleScaleConfirm = () => {
    console.log(`${scaleType} scaling selected items:`, selected);
    if (scaleType === 'manual') {
      console.log('Scale value:', scaleValue);
    }
    setScaleDialogOpen(false);
    setScaleValue('');
  };

  const handleDelete = () => {
    console.log('Deleting selected items:', selected);
    setSelected([]);
  };

  const handleDownloadCSV = () => {
    const csvData = tableData.map(row => ({
      Environment: row.env,
      Instances: row.instances,
      'Last Updated': row.last_updated,
      'Memory Usage': row.memory_usage,
      'Operational State': row.operationalstate,
      'Admin State': row.adminstate,
      'Global Routes': row.glb_routes.join('; ')
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${application.name}-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {application.name} - Details
        </Typography>
        
        <Box display="flex" gap={1}>
          <Tooltip title="Delete Selected">
            <IconButton 
              onClick={handleDelete}
              disabled={selected.length === 0}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download CSV">
            <IconButton 
              onClick={handleDownloadCSV}
              color="primary"
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {selected.length > 0 && (
        <Box display="flex" gap={2} mb={2}>
          <Button
            variant="contained"
            startIcon={<TrendingUpIcon />}
            onClick={() => handleScale('automatic')}
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#45a049' }
            }}
          >
            Automatic Scale ({selected.length})
          </Button>
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            onClick={() => handleScale('manual')}
            sx={{ 
              backgroundColor: '#ff9800',
              '&:hover': { backgroundColor: '#f57c00' }
            }}
          >
            Manual Scale ({selected.length})
          </Button>
        </Box>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < tableData.length}
                  checked={tableData.length > 0 && selected.length === tableData.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell><strong>Environment</strong></TableCell>
              <TableCell><strong>Instances</strong></TableCell>
              <TableCell><strong>Last Updated</strong></TableCell>
              <TableCell><strong>Memory Usage</strong></TableCell>
              <TableCell><strong>Operational State</strong></TableCell>
              <TableCell><strong>Admin State</strong></TableCell>
              <TableCell><strong>Global Routes</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.indexOf(row.id) !== -1}
                    onChange={() => handleSelect(row.id)}
                  />
                </TableCell>
                <TableCell>
                  <Chip label={row.env} variant="outlined" size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {row.instances}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(row.last_updated)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {row.memory_usage}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.operationalstate} 
                    color={getStatusColor(row.operationalstate)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.adminstate} 
                    color={getAdminStateColor(row.adminstate)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    {row.glb_routes.map((route, index) => (
                      <Chip 
                        key={index}
                        label={route} 
                        variant="outlined" 
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={scaleDialogOpen} onClose={() => setScaleDialogOpen(false)}>
        <DialogTitle>
          {scaleType === 'automatic' ? 'Automatic Scale' : 'Manual Scale'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {scaleType === 'automatic' 
              ? 'Auto-scaling will be enabled for the selected instances.'
              : 'Enter the number of instances to scale to:'}
          </Typography>
          
          {scaleType === 'manual' && (
            <TextField
              fullWidth
              label="Number of Instances"
              type="number"
              value={scaleValue}
              onChange={(e) => setScaleValue(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScaleDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleScaleConfirm}
            variant="contained"
            disabled={scaleType === 'manual' && !scaleValue}
          >
            Confirm Scale
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};