import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';

export default function DeletedFiles() {
    const [isLabelShrunk, setIsLabelShrunk] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [sort, setSort] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
    };

    const handleTextFieldFocus = () => {
        setIsLabelShrunk(true);
    };

    const handleTextFieldBlur = (event: any) => {
        if (!event.target.value) {
            setIsLabelShrunk(false);
        }
    };

    const handleCheckboxChange = (event: any) => {
        const value = event.target.value;

        if (selectedOption === value) {
            setSelectedOption('');
        } else {
            setSelectedOption(value);
        }
    };

    return (
        <div>
            <Box m={4}>
                <Typography variant="h4" fontWeight="bold" color="#374248"> Deleted Files </Typography>
            </Box>

            <Box mx={4}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid container item xs={12} sm={6} md={7} spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                                id="outlined-search" 
                                label="Search" 
                                type="search"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    shrink: isLabelShrunk,
                                    sx: { ml: isLabelShrunk ? 0 : 4 },
                                }}
                                onFocus={handleTextFieldFocus}
                                onBlur={handleTextFieldBlur}
                                sx={{
                                    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
                                    borderRadius: '20px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    width: '100%'
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} mt={1} ml={2}>
                            <Grid container direction="row" alignItems="center" spacing={1}>
                                <FormControlLabel
                                    value="delete"
                                    control={<Checkbox />}
                                    label="Delete Forever"
                                    labelPlacement="end"
                                    checked={selectedOption === 'delete'}
                                    onChange={handleCheckboxChange}
                                />
                                <FormControlLabel
                                    value="restore"
                                    control={<Checkbox />}
                                    label="Restore Files"
                                    labelPlacement="end"
                                    checked={selectedOption === 'restore'}
                                    onChange={handleCheckboxChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={6} md={3.5} spacing={2} justifyContent="flex-end">
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sort}
                                    label="Sort by"
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: '#A5E6AC',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '& .MuiSelect-root': {
                                            zIndex: 1,
                                        },
                                    }}
                                >
                                    <MenuItem value='all'>All</MenuItem>  {/* what are the menu items? */}
                                    <MenuItem value='name'>Name</MenuItem>
                                    <MenuItem value='date'>Date</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                        <Button
                            sx={{
                                fontSize: '13px',
                                color: 'red',
                                mt: { xs: -1, sm: 1, md: 1 },
                                textTransform: 'none',
                            }}
                            variant="text"
                        >
                            Clear Filters
                        </Button>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
