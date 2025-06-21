import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Search } from 'lucide-react';

interface SealLookupProps {
  onSealLookup: (sealId: string) => void;
  loading: boolean;
}

export const SealLookup: React.FC<SealLookupProps> = ({ onSealLookup, loading }) => {
  const [sealId, setSealId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sealId.trim()) {
      onSealLookup(sealId.trim());
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: 600, 
        mx: 'auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Seal Management System
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Enter a Seal ID to view and manage applications
        </Typography>
      </Box>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Seal ID"
          value={sealId}
          onChange={(e) => setSealId(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} color="rgba(255, 255, 255, 0.7)" />
              </InputAdornment>
            ),
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={!sealId.trim() || loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            }
          }}
        >
          {loading ? 'Searching...' : 'Lookup Applications'}
        </Button>
      </Box>
    </Paper>
  );
};