// src/components/Register.jsx

import React from 'react';
// Import all the necessary Material-UI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper'; // Used for the card-like background of the form

function Register() {
  return (
    // Main container (Material-UI Box) for the entire page
    // Centers content and applies a beautiful gradient background
    <Box
      sx={{
        minHeight: '100vh', // Ensures it takes full screen height
        display: 'flex', // Uses flexbox for centering
        alignItems: 'center', // Centers vertically
        justifyContent: 'center', // Centers horizontally
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', /* A warm, inviting gradient */
        p: 2, // Padding around the edges
      }}
    >
      {/* The white card/box containing the form (Material-UI Paper) */}
      <Paper
        elevation={10} // Adds a strong shadow for depth
        sx={{
          padding: 4, // Inner spacing
          borderRadius: 3, // Rounded corners
          maxWidth: 450, // Max width for the form box
          width: '100%', // Makes it responsive
          textAlign: 'center', // Centers text inside
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)', /* Custom shadow */
        }}
      >
        {/* Heading for the form (Material-UI Typography) */}
        <Typography variant="h4" component="h1" gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#333', // Dark text color
            mb: 4, // Margin bottom
            letterSpacing: '0.05em', // Slight letter spacing
          }}
        >
          Join <span style={{ color: '#FF8E53' }}>Prep</span>Speak
        </Typography>

        {/* Standard HTML form tag */}
        <form>
          {/* Email Input Field (Material-UI TextField) */}
          <TextField
            fullWidth // Takes full available width
            label="Email Address" // Floating label
            variant="outlined" // Has an outline border
            type="email"
            margin="normal" // Standard top/bottom margin
            placeholder="you@example.com"
            sx={{ mb: 2 }} // Margin bottom
          />

          {/* Password Input Field (Material-UI TextField) */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            placeholder="••••••••"
            sx={{ mb: 3 }} // Margin bottom
          />

          {/* Register Button (Material-UI Button) */}
          <Button
            fullWidth // Takes full available width
            variant="contained" // Solid background button
            size="large" // Larger button
            sx={{
              mt: 2, // Margin top
              py: 1.5, // Vertical padding
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient background for the button
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', // Button shadow
              '&:hover': { // Hover effects
                opacity: 0.9,
                transform: 'scale(1.02)', // Subtle scale effect
              },
              transition: 'all 0.3s ease-in-out', // Smooth transition for hover
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            Register for PrepSpeak
          </Button>
        </form>

        {/* "Already have an account?" text (Material-UI Typography) */}
        <Typography variant="body2" sx={{ mt: 3, color: '#666' }}>
          Already have an account?{' '}
          {/* "Login here" link (Material-UI Link) */}
          <Link href="#" color="primary" underline="hover"
            sx={{ fontWeight: 'bold' }} // Make the link bold
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;