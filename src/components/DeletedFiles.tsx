import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DeletedFiles() {
    const [isLabelShrunk, setIsLabelShrunk] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [sort, setSort] = React.useState('');
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

    const theme = useTheme();
    const isNotXsScreen = useMediaQuery(theme.breakpoints.up('sm'));

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

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <div>
            <Box m={4}>
                <Typography variant="h4" fontWeight="bold" color="#374248"> Deleted Files </Typography>
            </Box>
            <Stack direction="row" mx={4}>
                <Grid container>
                    <Grid item xs={15} sm={11} md={11}>
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
                </Grid>
                {isNotXsScreen ? (
                    <>
                        <Grid container mr={1}>
                            <Grid item md={12}>
                                <Stack direction="row" spacing={2}>
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
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
                            <Grid item sm={10} md={7}>
                                <Stack direction="row" spacing={2}>
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
                                            <MenuItem value='all'>All</MenuItem>
                                            <MenuItem value='name'>Name</MenuItem>
                                            <MenuItem value='date'>Date</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Grid item sm={15} md={10}>
                                        <Button
                                            sx={{
                                                fontSize: '13px',
                                                color: 'red',
                                                textTransform: 'none',
                                                mt: 1
                                            }}
                                            variant="text"
                                        >
                                            Clear Filters
                                        </Button>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Box mt={1}> {/* with menu icon for xs screens */}
                        <Grid container> 
                            <IconButton onClick={handleMenuClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={menuAnchor}
                                open={Boolean(menuAnchor)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem>
                                    <FormControlLabel
                                        value="delete"
                                        control={<Checkbox />}
                                        label="Delete Forever"
                                        labelPlacement="end"
                                        checked={selectedOption === 'delete'}
                                        onChange={handleCheckboxChange}
                                    />
                                </MenuItem>
                                <MenuItem>
                                    <FormControlLabel
                                        value="restore"
                                        control={<Checkbox />}
                                        label="Restore Files"
                                        labelPlacement="end"
                                        checked={selectedOption === 'restore'}
                                        onChange={handleCheckboxChange}
                                    />
                                </MenuItem>
                                <MenuItem>
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
                                            <MenuItem value='all'>All</MenuItem>
                                            <MenuItem value='name'>Name</MenuItem>
                                            <MenuItem value='date'>Date</MenuItem>
                                        </Select>
                                    </FormControl>
                                </MenuItem>
                                <MenuItem>
                                    <Button
                                        fullWidth
                                        sx={{
                                            fontSize: '13px',
                                            color: 'red',
                                            textTransform: 'none',
                                        }}
                                        variant="text"
                                    >
                                        Clear Filters
                                    </Button>
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Box>
                    )}
            </Stack>
        </div>
    );
}
